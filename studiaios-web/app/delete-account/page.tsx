import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell, LegalSection } from "@/components/LegalShell";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delete your account",
  description:
    "How to permanently delete your Studia account and all associated data.",
};

export default function DeleteAccountPage() {
  return (
    <LegalShell
      tag="Account"
      title="Delete your account"
      intro="Deleting your account is permanent: your sessions, streaks, proof photos, and leaderboard history go with it. Ranks are hard-earned — make sure this is what you want."
    >
      <LegalSection index="01" title="Delete from the app (fastest)">
        <p>
          Open Studia → <strong>Settings</strong> → <strong>Account</strong> →{" "}
          <strong>Delete account</strong>, then confirm. Deletion starts
          immediately.
        </p>
      </LegalSection>

      <LegalSection index="02" title="Delete by email">
        <p>
          No access to the app? Email <strong>{CONTACT_EMAIL}</strong> from
          the address on your account with the subject{" "}
          <strong>&ldquo;Delete my account&rdquo;</strong>. We&rsquo;ll verify
          it&rsquo;s you and confirm when deletion is complete.
        </p>
      </LegalSection>

      <LegalSection index="03" title="What gets deleted">
        <ul>
          <li>Your account and profile (email, display name, school link)</li>
          <li>All study sessions, streaks, and leaderboard history</li>
          <li>
            Session details like location and noise-level stats, where you
            enabled them
          </li>
          <li>Analytics data tied to your account, where identifiable</li>
        </ul>
        <p>
          Proof photos need no deletion — they are discarded the moment the AI
          witness rules on them and are never stored.
        </p>
        <p>
          Deletion from our systems completes within 30 days. Anonymized,
          aggregate statistics (e.g. total minutes studied across all users)
          may be retained as they no longer identify you.
        </p>
      </LegalSection>

      <LegalSection index="04" title="Studia+ subscriptions">
        <p>
          Deleting your account does <strong>not</strong> cancel an active
          Studia+ subscription — Apple bills it. Cancel first in iOS Settings
          → your name → Subscriptions → Studia. Details on the{" "}
          <Link href="/support" className="text-accent underline underline-offset-4">
            Support
          </Link>{" "}
          page.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
