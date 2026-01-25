import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";

export const dynamic = "force-static";

export default async function LegacyPage() {
  const legacyDir = path.join(process.cwd(), "public", "legacy");
  let files: string[] = [];
  try {
    files = await fs.readdir(legacyDir);
  } catch {
    files = [];
  }

  const html = files.filter((f) => f.toLowerCase().endsWith(".html")).sort();

  return (
    <section className="card">
      <h1>Legacy</h1>
      <p style={{ color: "var(--muted)" }}>
        These are the old static HTML pages preserved under <code>/legacy/*</code>.
      </p>
      {html.length ? (
        <ul>
          {html.map((f) => (
            <li key={f}>
              <Link href={`/legacy/${f}`}>{f}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "var(--muted)" }}>No legacy HTML found.</p>
      )}
    </section>
  );
}
