import Link from "next/link";
import { listPosts } from "@/lib/content";

export const dynamic = "force-static";

export default async function BlogIndexPage() {
  const posts = await listPosts();

  return (
    <section className="card">
      <h1>Blog</h1>
      {posts.length ? (
        <ul>
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`}>{p.title}</Link>
              {p.date ? <span style={{ color: "var(--muted)" }}> — {p.date}</span> : null}
              {p.excerpt ? (
                <div style={{ color: "var(--muted)", marginTop: 4 }}>{p.excerpt}</div>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "var(--muted)" }}>No posts found.</p>
      )}
    </section>
  );
}
