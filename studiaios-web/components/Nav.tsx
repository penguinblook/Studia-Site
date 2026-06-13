import Link from "next/link";
import { APP_STORE_URL } from "@/lib/site";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-bg/85 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
        aria-label="Main"
      >
        <Link href="/" className="display text-lg leading-none">
          Studia
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="/#loop" className="tag text-fg-muted transition-colors hover:text-fg">
            The loop
          </a>
          <a href="/#witness" className="tag text-fg-muted transition-colors hover:text-fg">
            The witness
          </a>
          <a href="/#ranks" className="tag text-fg-muted transition-colors hover:text-fg">
            Ranks
          </a>
          <Link href="/support" className="tag text-fg-muted transition-colors hover:text-fg">
            Support
          </Link>
        </div>

        <a
          href={APP_STORE_URL}
          className="tag bg-blue px-4 py-2.5 text-paper transition-colors hover:bg-blue-deep"
        >
          Get the app
        </a>
      </nav>
    </header>
  );
}
