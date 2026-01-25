import Link from "next/link";
import { loadPage, listPosts } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";

export default async function Home() {
  const page = await loadPage("index");
  const posts = (await listPosts()).slice(0, 5);

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <section className="card">
        <h1>Playground</h1>
        <p style={{ color: "var(--muted)", marginTop: 4 }}>
          Next.js + Vercel. Jekyll is dead.
        </p>
      </section>

      {page ? (
        <section className="card prose">
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(page.content) }} />
        </section>
      ) : (
        <section className="card">
          <p>
            No <code>content/pages/index.md</code> found yet.
          </p>
        </section>
      )}

      <section className="card">
        <h2>Recent posts</h2>
        {posts.length ? (
          <ul>
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                {p.date ? <span style={{ color: "var(--muted)" }}> — {p.date}</span> : null}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "var(--muted)" }}>
            No posts yet (or they haven’t been migrated).
          </p>
        )}
      </section>

      <section className="card">
        <h2>Next steps</h2>
        <ul>
          <li>
            Add non-static features via <code>app/api/*</code> routes.
          </li>
          <li>
            Add auth (Clerk / Auth.js) + a DB (Postgres / SQLite / KV).
          </li>
          <li>
            Replace markdown with MDX when you want components in content.
          </li>
        </ul>
      </section>
    </div>
  );
}
