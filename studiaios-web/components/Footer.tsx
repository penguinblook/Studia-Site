import Link from "next/link";
import { APP_STORE_URL, COMPANY, CONTACT_EMAIL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="display text-2xl">Studia</p>
          <p className="tag mt-3 text-paper/50">Lock in. Prove it. Climb.</p>
          <p className="mt-6 font-mono text-sm text-paper/40">{CONTACT_EMAIL}</p>
        </div>

        <nav className="md:col-span-3" aria-label="Product">
          <p className="tag mb-4 text-paper/40">Product</p>
          <ul className="space-y-3">
            <li>
              <a href={APP_STORE_URL} className="font-mono text-sm text-paper/70 transition-colors hover:text-paper">
                App Store
              </a>
            </li>
            <li>
              <a href="/#plus" className="font-mono text-sm text-paper/70 transition-colors hover:text-paper">
                Studia+
              </a>
            </li>
            <li>
              <Link href="/support" className="font-mono text-sm text-paper/70 transition-colors hover:text-paper">
                Support
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="md:col-span-3" aria-label="Legal">
          <p className="tag mb-4 text-paper/40">Legal</p>
          <ul className="space-y-3">
            <li>
              <Link href="/privacy" className="font-mono text-sm text-paper/70 transition-colors hover:text-paper">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="font-mono text-sm text-paper/70 transition-colors hover:text-paper">
                Terms of service
              </Link>
            </li>
            <li>
              <Link href="/delete-account" className="font-mono text-sm text-paper/70 transition-colors hover:text-paper">
                Delete account
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-charcoal-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="tag text-paper/30">
            © 2026 {COMPANY}. All rights reserved.
          </p>
          <p className="tag text-paper/30">Made for the ones who count minutes.</p>
        </div>
      </div>
    </footer>
  );
}
