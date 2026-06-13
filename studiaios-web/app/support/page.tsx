import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell, LegalSection } from "@/components/LegalShell";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with Studia — sessions, verification, the app shield, leaderboards, and Studia+ subscriptions.",
};

export default function SupportPage() {
  return (
    <LegalShell
      tag="Support"
      title="We read everything."
      intro={`Email us at ${CONTACT_EMAIL} and a human will get back to you — usually within a couple of days. Common questions are answered below.`}
    >
      <LegalSection index="01" title="My proof photo was rejected unfairly">
        <p>
          The witness rules on what it can see: a desk, materials, an actual
          study setup. Good lighting and a clear view of your workspace help —
          and you get up to three attempts per session, so reframe and try
          again. If you believe verification is consistently misjudging
          legitimate setups, email us with details; we tune the witness based
          on these reports. (Your photos are never stored — the witness judges
          them and discards them.)
        </p>
      </LegalSection>

      <LegalSection index="02" title="The app shield won't turn on">
        <p>
          The shield uses Apple&rsquo;s Screen Time framework, so it needs the
          Screen Time permission: iOS Settings → Screen Time must be enabled,
          and Studia needs the permission it requests on first session. If it
          still fails, restart the app; if that fails, restart your phone — it
          fixes more than we&rsquo;d like to admit.
        </p>
      </LegalSection>

      <LegalSection index="03" title="Why does Studia want microphone access?">
        <p>
          Only for noise sensing — measuring the ambient decibel level of your
          study spot. Audio is never recorded or stored; the app computes a
          number (like 42 dB) on your device and keeps only that. You can
          decline the permission and everything else still works. Details in
          our{" "}
          <Link href="/privacy" className="text-accent underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection index="04" title="How do I join my school's leaderboard?">
        <p>
          In the app, head to the leaderboard tab and search for your school.
          If your school isn&rsquo;t listed yet, you can add it — be the
          founder, claim #1 while it&rsquo;s easy.
        </p>
      </LegalSection>

      <LegalSection index="05" title="How do I cancel Studia+?">
        <p>
          Subscriptions are billed by Apple: iOS Settings → your name →
          Subscriptions → Studia → Cancel. Cancel at least 24 hours before
          your renewal date to avoid the next charge. Deleting the app does
          not cancel the subscription. Refunds are handled by Apple at{" "}
          <a
            href="https://support.apple.com/billing"
            className="text-accent underline underline-offset-4"
          >
            support.apple.com/billing
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection index="06" title="How do I delete my account?">
        <p>
          In the app via Settings, or from the web — full instructions on the{" "}
          <Link href="/delete-account" className="text-accent underline underline-offset-4">
            Delete account
          </Link>{" "}
          page.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
