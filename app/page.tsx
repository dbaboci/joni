import Link from "next/link";
import { loadPage, listPosts } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";

function Tile({
  title,
  desc,
  href,
  tag,
}: {
  title: string;
  desc: string;
  href: string;
  tag: string;
}) {
  return (
    <Link href={href} className="tile">
      <div className="tileTop">
        <span className="tileTag">{tag}</span>
      </div>
      <div className="tileTitle">{title}</div>
      <div className="tileDesc">{desc}</div>
    </Link>
  );
}

export default async function Home() {
  const page = await loadPage("index");
  const posts = (await listPosts()).slice(0, 6);

  return (
    <div className="stack">
      <section className="hero">
        <div className="heroTop">
          <div>
            <h1 className="heroTitle">A playground for a mind that won’t sit still.</h1>
            <p className="heroLead">
              Urban planning, software, systems, AI — and whatever else feels like a lever.
            </p>
            <div className="heroCtas">
              <Link className="button" href="/blog">
                Read
              </Link>
              <Link className="button buttonGhost" href="/now">
                What I’m doing now
              </Link>
            </div>
          </div>
          <div className="heroAside">
            <div className="card cardSoft">
              <div className="kicker">Signal</div>
              <ul className="bullets">
                <li>Think in systems.</li>
                <li>Ship small experiments.</li>
                <li>Make cities less dumb.</li>
                <li>Use AI without worshipping it.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="grid">
        <Tile
          title="Blog"
          desc="Essays, notes, and half-formed thoughts worth saving."
          href="/blog"
          tag="writing"
        />
        <Tile
          title="Now"
          desc="Current focus, priorities, and constraints."
          href="/now"
          tag="status"
        />
        <Tile
          title="Media"
          desc="Things I’m consuming and collecting."
          href="/media"
          tag="feed"
        />
        <Tile
          title="About"
          desc="Context and bias."
          href="/about"
          tag="profile"
        />
      </section>

      {page ? (
        <section className="card prose">
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(page.content) }} />
        </section>
      ) : null}

      <section className="card">
        <div className="sectionHeader">
          <h2 style={{ margin: 0 }}>Recent posts</h2>
          <Link className="smallLink" href="/blog">
            all posts →
          </Link>
        </div>
        {posts.length ? (
          <div className="postList">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="postRow">
                <div className="postTitle">{p.title}</div>
                <div className="postMeta">
                  {p.date ? <span>{p.date}</span> : <span className="muted">undated</span>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="muted">No posts found.</p>
        )}
      </section>

      <section className="card cardSoft">
        <h2 style={{ marginTop: 0 }}>This will become dynamic.</h2>
        <p className="muted" style={{ marginBottom: 0 }}>
          Next up: projects, experiments, maps, datasets, interactive notebooks, AI agents, whatever.
          We’ll add API routes + auth + a DB when you’re ready.
        </p>
      </section>
    </div>
  );
}
