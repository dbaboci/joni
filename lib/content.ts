import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type ContentPage = {
  slug: string;
  title?: string;
  content: string;
};

export type BlogPost = {
  /** Canonical, URL-safe slug */
  slug: string;
  /** Original slug as derived from filename (may contain unicode punctuation) */
  sourceSlug: string;
  title: string;
  date?: string;
  excerpt?: string;
  content: string;
};

const ROOT = process.cwd();
const PAGES_DIR = path.join(ROOT, "content", "pages");
const POSTS_DIR = path.join(ROOT, "content", "posts");

function canonicalizeSlug(input: string) {
  // Normalize unicode (turn smart quotes/dashes into their base forms) then keep URLs ASCII-safe.
  return input
    .normalize("NFKD")
    .replace(/[\u2018\u2019\u201B\u2032]/g, "'") // single quotes
    .replace(/[\u201C\u201D\u201F\u2033]/g, '"') // double quotes
    .replace(/[\u2013\u2014\u2212]/g, "-") // en dash, em dash, minus
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

async function readFileIfExists(filePath: string): Promise<string | null> {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (e: unknown) {
    const err = e as NodeJS.ErrnoException;
    if (err?.code === "ENOENT") return null;
    throw e;
  }
}

export async function loadPage(slug: string): Promise<ContentPage | null> {
  const filePath = path.join(PAGES_DIR, `${slug}.md`);
  const raw = await readFileIfExists(filePath);
  if (!raw) return null;
  const { data, content } = matter(raw);
  return {
    slug,
    title: typeof data.title === "string" ? data.title : undefined,
    content,
  };
}

export async function listPosts(): Promise<Omit<BlogPost, "content">[]> {
  let entries: string[] = [];
  try {
    entries = await fs.readdir(POSTS_DIR);
  } catch (e: unknown) {
    const err = e as NodeJS.ErrnoException;
    if (err?.code === "ENOENT") return [];
    throw e;
  }

  const posts = await Promise.all(
    entries
      .filter((f) => f.endsWith(".md") || f.endsWith(".markdown"))
      .map(async (filename) => {
        const raw = await fs.readFile(path.join(POSTS_DIR, filename), "utf8");
        const { data, content } = matter(raw);
        const sourceSlug = filename
          .replace(/\.(md|markdown)$/i, "")
          .replace(/^\d{4}-\d{2}-\d{2}-/, "");

        const slug = canonicalizeSlug(sourceSlug) || sourceSlug;

        const title =
          (typeof data.title === "string" && data.title) ||
          sourceSlug.replace(/[-_]+/g, " ");

        const date = typeof data.date === "string" ? data.date : undefined;
        const excerpt =
          typeof data.excerpt === "string"
            ? data.excerpt
            : content.split("\n").find((l) => l.trim())?.slice(0, 180);

        return { slug, sourceSlug, title, date, excerpt };
      })
  );

  posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return posts;
}

export async function loadPost(slug: string): Promise<BlogPost | null> {
  // Try matching filename patterns: slug.md or YYYY-MM-DD-slug.md
  let entries: string[] = [];
  try {
    entries = await fs.readdir(POSTS_DIR);
  } catch (e: unknown) {
    const err = e as NodeJS.ErrnoException;
    if (err?.code === "ENOENT") return null;
    throw e;
  }

  const wanted = canonicalizeSlug(slug) || slug;

  const match = entries.find((f) => {
    const base = f.replace(/\.(md|markdown)$/i, "");
    const sourceSlug = base.replace(/^\d{4}-\d{2}-\d{2}-/, "");
    const canon = canonicalizeSlug(sourceSlug) || sourceSlug;

    return (
      base === slug ||
      base.endsWith(`-${slug}`) ||
      sourceSlug === slug ||
      canon === wanted
    );
  });
  if (!match) return null;

  const raw = await fs.readFile(path.join(POSTS_DIR, match), "utf8");
  const { data, content } = matter(raw);

  const sourceSlug = match
    .replace(/\.(md|markdown)$/i, "")
    .replace(/^\d{4}-\d{2}-\d{2}-/, "");

  const canonical = canonicalizeSlug(sourceSlug) || sourceSlug;

  const title =
    (typeof data.title === "string" && data.title) ||
    sourceSlug.replace(/[-_]+/g, " ");

  const date = typeof data.date === "string" ? data.date : undefined;
  const excerpt =
    typeof data.excerpt === "string"
      ? data.excerpt
      : content.split("\n").find((l) => l.trim())?.slice(0, 180);

  return { slug: canonical, sourceSlug, title, date, excerpt, content };
}
