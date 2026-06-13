import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell, LegalSection } from "@/components/LegalShell";
import { COMPANY, CONTACT_EMAIL, EFFECTIVE_DATE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Studia handles your data: account, proof photos, location, ambient noise levels, Screen Time, analytics, and purchases.",
};

export default function PrivacyPage() {
  return (
    <LegalShell
      tag="Legal"
      title="Privacy Policy"
      meta={`Effective: ${EFFECTIVE_DATE} · Operated by ${COMPANY}`}
      intro="Studia is built around proof, so we want to be precise about what we collect, why, and what we never touch. The short version: we collect what the product needs to work, your proof photos are judged and then discarded — never stored — your microphone audio is never recorded, and your Screen Time data never leaves your device."
    >
      <LegalSection index="01" title="Who we are">
        <p>
          Studia (&ldquo;the app&rdquo;) is operated by {COMPANY}
          (&ldquo;we&rdquo;, &ldquo;us&rdquo;). This policy covers the Studia
          iOS app and the studiaios.com website. Questions go to{" "}
          <strong>{CONTACT_EMAIL}</strong>.
        </p>
      </LegalSection>

      <LegalSection index="02" title="What we collect">
        <p>
          <strong>Account information.</strong> When you create an account we
          collect your email address and basic profile details (display name,
          school if you join one). Authentication and storage are provided by
          Supabase, our backend provider.
        </p>
        <p>
          <strong>Study session data.</strong> Session start/end times,
          duration, verification outcome, streaks, and leaderboard standings.
          This is the core of the product.
        </p>
        <p>
          <strong>Proof photos — judged, then discarded.</strong> At the end of
          a session the camera takes a live photo of your setup (no gallery
          uploads). The downscaled photo is sent to an AI vision model, which
          returns a verdict — and the image is then discarded.{" "}
          <strong>Proof photos are never stored</strong>, on our servers or
          anywhere else; we keep only the outcome (verified or not, a
          confidence score, and a short reason). They are not used to train
          models.
        </p>
        <p>
          <strong>Analytics.</strong> We use PostHog to understand how the app
          is used — events (e.g. &ldquo;session started&rdquo;), device type,
          OS version, and similar technical data. We use this to fix bugs and
          improve the product, not to build advertising profiles.
        </p>
        <p>
          <strong>Purchases.</strong> Studia+ subscriptions are processed by
          Apple and managed through RevenueCat. We receive subscription status
          (active, expired, trial) and anonymized transaction records. We never
          see your payment card details.
        </p>
      </LegalSection>

      <LegalSection index="03" title="Location">
        <p>
          If you grant location permission, your session location powers the
          study map: study spots, nearby schools, and the study-density
          heatmap. Sharing your location into the heatmap is{" "}
          <strong>opt-in</strong> (off by default, toggled in Settings), and
          the heatmap is deliberately coarse — locations are snapped to a
          ~500-meter grid and a cell is only shown once enough sessions happen
          there. Your exact coordinates are never shown to other users. You
          can revoke the permission at any time in iOS Settings; the app works
          without it.
        </p>
      </LegalSection>

      <LegalSection index="04" title="Microphone — audio is never recorded">
        <p>
          Studia&rsquo;s noise sensing measures the ambient sound level
          (a decibel value) of your study environment. To be unambiguous:
        </p>
        <ul>
          <li>
            <strong>We never record, store, or transmit audio.</strong> No
            recordings exist, on your device or on our servers.
          </li>
          <li>
            The microphone is used only to read numeric sound levels on your
            device. Only summary statistics (average, minimum, maximum level
            and a band like &ldquo;quiet&rdquo; or &ldquo;lively&rdquo;) may
            be attached to a session.
          </li>
          <li>
            These numbers are private to you — they are never shown to other
            users or used in leaderboards. Speech and sound content are never
            captured or analyzed.
          </li>
          <li>
            Noise sensing is optional; the app works with the permission
            denied.
          </li>
        </ul>
      </LegalSection>

      <LegalSection index="05" title="Screen Time — processed on your device">
        <p>
          App blocking is built on Apple&rsquo;s Screen Time (FamilyControls
          and ManagedSettings) frameworks. Apple designed these so that the
          list of apps you block and your app-usage information are processed
          on-device and are not exposed to us. We never see which apps you
          block, which apps you use, or for how long. The shield is between you
          and your phone — we are not in that conversation.
        </p>
      </LegalSection>

      <LegalSection index="06" title="Who we share data with">
        <p>
          We share data only with the service providers needed to run Studia,
          and only what each one needs:
        </p>
        <ul>
          <li>
            <strong>Supabase</strong> — authentication and database (account,
            sessions, stats).
          </li>
          <li>
            <strong>PostHog</strong> — product analytics events.
          </li>
          <li>
            <strong>RevenueCat / Apple</strong> — subscription management and
            billing.
          </li>
          <li>
            <strong>AI verification provider</strong> — proof photos are
            processed transiently to produce a verification ruling, then
            discarded; they are never retained or used to train models.
          </li>
        </ul>
        <p>
          We do not sell your personal data, and we do not share it with
          advertisers or data brokers.
        </p>
      </LegalSection>

      <LegalSection index="07" title="Leaderboards are social">
        <p>
          Leaderboards display your display name, rank, school, and verified
          study time to other users (e.g. classmates at your school), per your
          in-app settings. Don&rsquo;t put anything in your display name you
          wouldn&rsquo;t want a rival to read.
        </p>
      </LegalSection>

      <LegalSection index="08" title="Retention and deletion">
        <p>
          We keep your data while your account is active. When you delete your
          account, your personal data is deleted from our systems within 30
          days, except where we are legally required to retain records. (Proof
          photos need no deletion — they were never stored.) See{" "}
          <Link href="/delete-account" className="text-accent underline underline-offset-4">
            Delete account
          </Link>{" "}
          for how to request deletion.
        </p>
      </LegalSection>

      <LegalSection index="09" title="Your rights">
        <p>
          Depending on where you live, you may have rights to access, correct,
          export, or delete your personal data, and to object to certain
          processing. Email <strong>{CONTACT_EMAIL}</strong> and we will honor
          these requests.
        </p>
      </LegalSection>

      <LegalSection index="10" title="Age">
        <p>
          Studia is built for students and is not directed at children under
          13 (or the minimum age in your region). We do not knowingly collect
          data from children below that age; if you believe we have, contact
          us and we will delete it.
        </p>
      </LegalSection>

      <LegalSection index="11" title="Changes">
        <p>
          If we change this policy in a meaningful way, we&rsquo;ll update the
          effective date above and notify you in the app. Continued use after
          changes take effect means you accept the updated policy.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
