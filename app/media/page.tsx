import { loadPage } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { notFound } from "next/navigation";

export default async function MediaPage() {
  const page = await loadPage("media");
  if (!page) return notFound();
  return (
    <article className="card prose">
      <h1>{page.title ?? "Media"}</h1>
      <div dangerouslySetInnerHTML={{ __html: renderMarkdown(page.content) }} />
    </article>
  );
}
