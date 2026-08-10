import Link from "next/link";
import { listPosts } from "@/lib/content";
import { formatPostDate } from "@/lib/date";

export default async function Home() {
  const posts = (await listPosts()).slice(0, 6);

  return (
    <div className="homePage">
      <section className="homeIntro">
        <p className="eyebrow">Joni Baboci · Tirana, Albania</p>
        <h1>
          Planner, architect, and builder exploring how cities work - and how
          they might work better.
        </h1>
        <p className="introText">
          I work across urban planning, public institutions, and software. I’m
          currently building <a href="https://getlayer.xyz">Layer</a> and writing
          about cities, systems, and technology.
        </p>
        <div className="introLinks">
          <Link href="/about">About me <span aria-hidden>↗</span></Link>
          <a href="https://getlayer.xyz" rel="noreferrer" target="_blank">
            Layer <span aria-hidden>↗</span>
          </a>
        </div>
      </section>

      <section className="writingSection">
        <div className="sectionHeading">
          <div>
            <p className="sectionLabel">Writing</p>
            <h2>Recent notes</h2>
          </div>
          <Link className="quietLink" href="/blog">All writing →</Link>
        </div>

        {posts.length ? (
          <ol className="writingList">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="writingTitle">
                    <h3>{post.title}</h3>
                    {post.excerpt ? <p>{post.excerpt}</p> : null}
                  </div>
                  {post.date ? <time>{formatPostDate(post.date)}</time> : null}
                  <span className="writingArrow" aria-hidden>↗</span>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="muted">No posts found.</p>
        )}
      </section>

      <section className="homeDetails">
        <article>
          <p className="sectionLabel">Profile</p>
          <h2>A decade working on cities from inside government, practice, and technology.</h2>
          <Link className="quietLink" href="/about">Read more →</Link>
        </article>
        <article>
          <p className="sectionLabel">Media</p>
          <h2>Conversations, talks, podcasts, and other appearances.</h2>
          <Link className="quietLink" href="/media">Browse media →</Link>
        </article>
      </section>

      <section className="subscribeSection">
        <div>
          <p className="sectionLabel">ThinkThinkThink</p>
          <h2>Occasional notes on cities, complexity, and science.</h2>
        </div>
        <a
          className="subscribeLink"
          href="https://thinkthinkthink.substack.com/subscribe"
          rel="noreferrer"
          target="_blank"
        >
          Subscribe <span aria-hidden>↗</span>
        </a>
      </section>
    </div>
  );
}
