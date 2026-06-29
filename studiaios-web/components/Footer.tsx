import Link from "next/link";
import { COMPANY, CONTACT_EMAIL } from "@/lib/site";
import AppStoreButton from "./AppStoreButton";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="display text-2xl">Studia</p>
          <p className="tag mt-3 text-paper/50">Lock in. Prove it. Climb.</p>
          <p className="mt-6 font-mono text-sm text-paper/40">{CONTACT_EMAIL}</p>
        </div>

        <nav className="md:col-span-6 md:text-right" aria-label="Product">
          <p className="tag mb-4 text-paper/40">Product</p>
          <div className="flex md:justify-end">
            <AppStoreButton variant="paper" imgClassName="h-12" />
          </div>
        </nav>
      </div>

      <div className="border-t border-charcoal-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="tag text-paper/30">
            © 2026 {COMPANY}. All rights reserved.
          </p>
          <nav className="flex gap-6" aria-label="Legal">
            <Link
              href="/support"
              className="tag text-paper/50 transition-colors hover:text-paper"
            >
              Support
            </Link>
            <Link
              href="/privacy"
              className="tag text-paper/50 transition-colors hover:text-paper"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="tag text-paper/50 transition-colors hover:text-paper"
            >
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
