import Link from "next/link";
import { loadPage, listPosts } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";

export default async function Home() {
  const page = await loadPage("index");
  const posts = (await listPosts()).slice(0, 10);

  return (
    <div className="stack">
      <section className="intro">
        <h1 className="introTitle">
          I build tools and ideas for living in cities without losing your mind.
        </h1>
        <p className="introLead">
          This is my playground: writing, experiments, and prototypes — cleanly
          organized, intentionally unfinished.
        </p>
        <p className="introLinks">
          <Link href="/now">Now</Link>
          <span aria-hidden> · </span>
          <Link href="/blog">Blog</Link>
          <span aria-hidden> · </span>
          <Link href="/media">Media</Link>
          <span aria-hidden> · </span>
          <Link href="/about">About</Link>
        </p>
      </section>

      {page ? (
        <section className="prose">
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(page.content) }} />
        </section>
      ) : null}

      <section className="section">
        <div className="sectionHeader">
          <h2>Recent posts</h2>
          <Link className="sectionLink" href="/blog">
            all posts
          </Link>
        </div>

        {posts.length ? (
          <ol className="postList">
            {posts.map((p) => (
              <li key={p.slug} className="postItem">
                <Link className="postLink" href={`/blog/${p.slug}`}>
                  {p.title}
                </Link>
                {p.date ? <span className="postMeta">{p.date}</span> : null}
              </li>
            ))}
          </ol>
        ) : (
          <p className="muted">No posts found.</p>
        )}
      </section>

      <section className="section">
        <h2>Legacy</h2>
        <p className="muted">
          The old static pages are preserved at <Link href="/legacy">/legacy</Link>.
        </p>
      </section>
    </div>
  );
}
