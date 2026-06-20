import type { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

/**
 * Shared shell for legal/support pages — editorial, readable,
 * styled to match the brand rather than a wall of grey text.
 */
export function LegalShell({
  tag,
  title,
  intro,
  meta,
  children,
}: {
  tag: string;
  title: string;
  intro?: ReactNode;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-5 pb-28 pt-16 sm:px-8 md:pt-24">
        <p className="tag text-fg-muted">{tag}</p>
        <h1 className="display mt-4 text-[clamp(2.4rem,6vw,4rem)]">{title}</h1>
        {meta && <p className="tag mt-5 text-fg-muted">{meta}</p>}
        {intro && (
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-fg-soft">
            {intro}
          </p>
        )}
        <div className="mt-14 space-y-12">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-rule pt-10">
      <h2 className="display flex items-baseline gap-4 text-2xl">
        <span className="tag text-accent">{index}</span>
        {title}
      </h2>
      <div className="mt-5 space-y-4 leading-relaxed text-fg-soft [&_strong]:text-fg [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
