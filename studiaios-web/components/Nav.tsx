import Link from "next/link";
import AppStoreButton from "./AppStoreButton";

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
        <AppStoreButton variant="dark" imgClassName="h-10" />
      </nav>
    </header>
  );
}
