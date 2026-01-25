import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type ContentPage = {
  slug: string;
  title?: string;
  content: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  content: string;
};

const ROOT = process.cwd();
const PAGES_DIR = path.join(ROOT, "content", "pages");
const POSTS_DIR = path.join(ROOT, "content", "posts");

async function readFileIfExists(filePath: string): Promise<string | null> {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (e: any) {
    if (e?.code === "ENOENT") return null;
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
  } catch (e: any) {
    if (e?.code === "ENOENT") return [];
    throw e;
  }

  const posts = await Promise.all(
    entries
      .filter((f) => f.endsWith(".md") || f.endsWith(".markdown"))
      .map(async (filename) => {
        const raw = await fs.readFile(path.join(POSTS_DIR, filename), "utf8");
        const { data, content } = matter(raw);
        const slug = filename
          .replace(/\.(md|markdown)$/i, "")
          .replace(/^\d{4}-\d{2}-\d{2}-/, "");

        const title =
          (typeof data.title === "string" && data.title) ||
          slug.replace(/[-_]+/g, " ");

        const date = typeof data.date === "string" ? data.date : undefined;
        const excerpt =
          typeof data.excerpt === "string"
            ? data.excerpt
            : content.split("\n").find((l) => l.trim())?.slice(0, 180);

        return { slug, title, date, excerpt };
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
  } catch (e: any) {
    if (e?.code === "ENOENT") return null;
    throw e;
  }

  const match = entries.find((f) => {
    const base = f.replace(/\.(md|markdown)$/i, "");
    return base === slug || base.endsWith(`-${slug}`);
  });
  if (!match) return null;

  const raw = await fs.readFile(path.join(POSTS_DIR, match), "utf8");
  const { data, content } = matter(raw);

  const title =
    (typeof data.title === "string" && data.title) ||
    slug.replace(/[-_]+/g, " ");

  const date = typeof data.date === "string" ? data.date : undefined;
  const excerpt =
    typeof data.excerpt === "string"
      ? data.excerpt
      : content.split("\n").find((l) => l.trim())?.slice(0, 180);

  return { slug, title, date, excerpt, content };
}
