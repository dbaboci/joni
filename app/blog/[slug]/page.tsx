import { loadPost, listPosts } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await listPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return notFound();

  return (
    <article className="card prose">
      <h1>{post.title}</h1>
      {post.date ? <p style={{ color: "var(--muted)" }}>{post.date}</p> : null}
      <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
    </article>
  );
}
