#!/usr/bin/env node
/*
  Sync Substack posts into /content/posts.

  - Fetches RSS feed
  - Imports missing posts as Markdown files (HTML body kept as-is)
  - Ensures all existing posts have a frontmatter `date`

  Usage:
    node scripts/sync-substack.mjs

  Notes:
    - Images are left as Substack CDN URLs.
    - Slugs are derived from Substack URLs (preferred) and canonicalized for filenames.
*/

import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { XMLParser } from 'fast-xml-parser';

const FEED_URL = process.env.SUBSTACK_FEED_URL || 'https://thinkthinkthink.substack.com/feed';
const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, 'content', 'posts');

function canonicalizeSlug(input) {
  return String(input)
    .normalize('NFKD')
    .replace(/[\u2018\u2019\u201B\u2032]/g, "'")
    .replace(/[\u201C\u201D\u201F\u2033]/g, '"')
    .replace(/[\u2013\u2014\u2212]/g, '-')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function ymd(d) {
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return null;
  const yyyy = String(dt.getUTCFullYear());
  const mm = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(dt.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function slugFromUrl(url) {
  try {
    const u = new URL(url);
    // Substack posts usually: /p/<slug>
    const parts = u.pathname.split('/').filter(Boolean);
    const pIdx = parts.indexOf('p');
    if (pIdx !== -1 && parts[pIdx + 1]) return parts[pIdx + 1];
    // fallback: last segment
    return parts.at(-1) || null;
  } catch {
    return null;
  }
}

async function listLocalPosts() {
  let entries = [];
  try {
    entries = await fs.readdir(POSTS_DIR);
  } catch {
    return [];
  }
  return entries.filter((f) => f.endsWith('.md') || f.endsWith('.markdown'));
}

function sourceSlugFromFilename(filename) {
  return filename.replace(/\.(md|markdown)$/i, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

async function readLocalIndex(files) {
  const byTitle = new Map();
  const byUrl = new Map();
  const byCanonicalSlug = new Map();

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = matter(raw);

    const title = typeof parsed.data.title === 'string' ? parsed.data.title.trim() : '';
    const titleKey = title.toLowerCase();

    const url = typeof parsed.data.source === 'string' ? parsed.data.source.trim() : (typeof parsed.data.canonical === 'string' ? parsed.data.canonical.trim() : '');

    const sourceSlug = sourceSlugFromFilename(file);
    const canon = canonicalizeSlug(sourceSlug);

    if (title) byTitle.set(titleKey, { file, filePath, parsed });
    if (url) byUrl.set(url, { file, filePath, parsed });
    if (canon) byCanonicalSlug.set(canon, { file, filePath, parsed });
  }

  return { byTitle, byUrl, byCanonicalSlug };
}

async function ensureDatesOnExisting(files) {
  let changed = 0;
  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = matter(raw);

    const hasDate = typeof parsed.data.date === 'string' && parsed.data.date.trim();
    if (hasDate) continue;

    const prefix = file.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1];
    if (!prefix) continue;

    parsed.data.date = `${prefix}T00:00:00.000Z`;

    const out = matter.stringify(parsed.content.trimStart(), parsed.data);
    await fs.writeFile(filePath, out, 'utf8');
    changed += 1;
  }
  return changed;
}

async function main() {
  await fs.mkdir(POSTS_DIR, { recursive: true });

  const localFiles = await listLocalPosts();
  const localSourceSlugs = new Set(localFiles.map(sourceSlugFromFilename));
  const localCanonicalSlugs = new Set(localFiles.map((f) => canonicalizeSlug(sourceSlugFromFilename(f))));
  const index = await readLocalIndex(localFiles);

  const res = await fetch(FEED_URL, { headers: { 'user-agent': 'joni-site-sync/1.0' } });
  if (!res.ok) throw new Error(`Failed to fetch feed: ${res.status} ${res.statusText}`);
  const xml = await res.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    // Keep CDATA bodies
    cdataPropName: '__cdata',
  });

  const data = parser.parse(xml);
  const items = data?.rss?.channel?.item;
  const list = Array.isArray(items) ? items : items ? [items] : [];

  let added = 0;
  let updated = 0;

  for (const item of list) {
    const title = (item?.title?.__cdata ?? item?.title ?? '').toString().trim();
    const link = (item?.link ?? '').toString().trim();
    const pubDate = (item?.pubDate ?? '').toString().trim();
    const description = (item?.description?.__cdata ?? item?.description ?? '').toString().trim();

    const encoded = (item?.['content:encoded']?.__cdata ?? item?.['content:encoded'] ?? '').toString();

    const sourceSlug = slugFromUrl(link) || canonicalizeSlug(title);
    if (!sourceSlug) continue;

    const canonical = canonicalizeSlug(sourceSlug);

    // If it already exists (by url/title/slug), update metadata instead of creating duplicates.
    const existing =
      (link && index.byUrl.get(link)) ||
      (title && index.byTitle.get(title.toLowerCase())) ||
      (canonical && index.byCanonicalSlug.get(canonical)) ||
      (localSourceSlugs.has(sourceSlug) ? { file: null } : null);

    if (existing && existing.filePath) {
      const parsed = existing.parsed;
      const iso = new Date(pubDate).toISOString();
      if (pubDate && iso && typeof parsed.data.date !== 'string') parsed.data.date = iso;
      if (pubDate && iso && typeof parsed.data.date === 'string' && parsed.data.date !== iso) parsed.data.date = iso;
      if (link) {
        parsed.data.source = parsed.data.source || link;
        parsed.data.canonical = parsed.data.canonical || link;
      }
      if (description && !parsed.data.excerpt) parsed.data.excerpt = description;

      const out = matter.stringify(parsed.content.trimStart(), parsed.data);
      await fs.writeFile(existing.filePath, out, 'utf8');
      updated += 1;
      continue;
    }

    // Skip if already present by slug variants.
    if (localSourceSlugs.has(sourceSlug)) continue;
    if (localCanonicalSlugs.has(canonical)) continue;

    const datePrefix = ymd(pubDate) || '1970-01-01';
    const filename = `${datePrefix}-${canonical}.md`;
    const filePath = path.join(POSTS_DIR, filename);

    const fm = {
      title: title || sourceSlug,
      date: new Date(pubDate).toISOString(),
      excerpt: description || undefined,
      source: link || undefined,
      canonical: link || undefined,
    };

    // Keep Substack HTML as-is (marked will pass through HTML).
    const body = `${encoded}`.trim() || '';

    const out = matter.stringify(body + '\n', fm);
    await fs.writeFile(filePath, out, 'utf8');
    added += 1;

    console.log(`+ ${filename}  (${title})`);
  }

  const updatedDates = await ensureDatesOnExisting(await listLocalPosts());

  console.log(`\nDone. Added: ${added}. Updated existing from feed: ${updated}. Filled missing dates: ${updatedDates}.`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
