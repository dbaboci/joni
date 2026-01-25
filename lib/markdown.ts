import { marked } from "marked";

// Minimal markdown -> HTML. (Server-rendered.)
marked.setOptions({
  gfm: true,
  breaks: false,
});

export function renderMarkdown(md: string): string {
  return marked.parse(md) as string;
}
