import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell, LegalSection } from "@/components/LegalShell";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with Studia — contact support and find answers to common questions about verification, streaks, Studia+, and your account.",
};

export default function SupportPage() {
  return (
    <LegalShell
      tag="Help"
      title="Support"
      meta="We read every email"
      intro={
        <>
          Need a hand? Email us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-accent underline underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          and we&rsquo;ll get back to you. Include your account email and, if
          it&rsquo;s a bug, your iOS version so we can help faster. Common
          questions are answered below.
        </>
      }
    >
      <LegalSection index="01" title="My session wasn't verified — what happened?">
        <p>
          Verification uses an AI vision model to confirm a real study setup.
          It can occasionally get it wrong in either direction. Make sure your
          books, notes, or screen are clearly in frame, the shot is well-lit,
          and you&rsquo;re photographing a live scene (not a photo of a photo).
          If you believe a session was wrongly rejected, email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-accent underline underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          with the date and time.
        </p>
      </LegalSection>

      <LegalSection index="02" title="I lost my streak / my stats look wrong">
        <p>
          Streaks are based on verified sessions in your local time zone.
          Traveling across time zones, a missed day, or an unverified session
          can break a streak. If your stats look genuinely off, send us your
          account email and roughly when it happened and we&rsquo;ll
          investigate.
        </p>
      </LegalSection>

      <LegalSection index="03" title="How do I manage or cancel Studia+?">
        <p>
          Studia+ is billed through Apple. Manage or cancel anytime in iOS
          Settings → tap your name → Subscriptions → Studia. Cancel at least 24
          hours before the period ends to avoid the next charge. Deleting the
          app does not cancel a subscription. Refunds are handled by Apple at{" "}
          <a
            href="https://support.apple.com/billing"
            className="text-accent underline underline-offset-4"
          >
            support.apple.com/billing
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection index="04" title="The app shield / blocking isn't working">
        <p>
          App blocking is built on Apple&rsquo;s Screen Time (FamilyControls)
          frameworks. If the shield isn&rsquo;t working, check that you granted
          Screen Time permission when prompted, and that no conflicting
          restrictions are set in iOS Settings → Screen Time. Restarting the
          app after granting permission usually fixes it.
        </p>
      </LegalSection>

      <LegalSection index="05" title="How do I delete my account and data?">
        <p>
          Email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-accent underline underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          from your account email to request deletion. Your personal data is
          removed within 30 days. See the{" "}
          <Link
            href="/privacy"
            className="text-accent underline underline-offset-4"
          >
            Privacy Policy
          </Link>{" "}
          for details on what we keep and why.
        </p>
      </LegalSection>

      <LegalSection index="06" title="Is my proof photo or microphone audio stored?">
        <p>
          No. Proof photos are sent to a vision model for a verdict and then
          discarded — never stored or used to train models. Noise sensing reads
          only ambient sound levels; audio is never recorded or transmitted.
          Full detail is in the{" "}
          <Link
            href="/privacy"
            className="text-accent underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection index="07" title="Still stuck?">
        <p>
          Email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-accent underline underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>
          . We read every message and aim to reply within a couple of business
          days.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
