import { loadPage } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { notFound } from "next/navigation";

export default async function AboutPage() {
  const page = await loadPage("about");
  if (!page) return notFound();
  return (
    <article className="card prose aboutPage">
      <h1>{page.title ?? "About"}</h1>
      <div dangerouslySetInnerHTML={{ __html: renderMarkdown(page.content) }} />

      <section className="newsletterCard" aria-labelledby="newsletter-title">
        <div className="newsletterIntro">
          <p className="sectionLabel">ThinkThinkThink</p>
          <h2 id="newsletter-title">Cities, complex systems and science.</h2>
          <p>
            Subscribe to my occasional newsletter about how places work — and
            how they might work better.
          </p>
        </div>
        <form
          className="newsletterForm"
          action="https://thinkthinkthink.substack.com/api/v1/free?nojs=true"
          method="post"
          target="_blank"
          rel="noopener"
        >
          <input type="hidden" name="source" value="embed" />
          <label className="srOnly" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Your email address"
            required
          />
          <button type="submit">
            Subscribe <span aria-hidden>↗</span>
          </button>
        </form>
        <p className="newsletterFinePrint">
          Subscriptions are handled by Substack and open in a new tab.
        </p>
      </section>
    </article>
  );
}
