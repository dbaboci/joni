import { loadPage } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { notFound } from "next/navigation";

export default async function ContactPage() {
  const page = await loadPage("contact");
  if (!page) return notFound();
  return (
    <article className="card prose">
      <h1>{page.title ?? "Contact"}</h1>
      <div dangerouslySetInnerHTML={{ __html: renderMarkdown(page.content) }} />
    </article>
  );
}
