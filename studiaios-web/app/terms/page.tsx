import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell, LegalSection } from "@/components/LegalShell";
import { COMPANY, CONTACT_EMAIL, EFFECTIVE_DATE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of Studia, including Studia+ auto-renewing subscriptions billed through Apple.",
};

export default function TermsPage() {
  return (
    <LegalShell
      tag="Legal"
      title="Terms of Service"
      meta={`UPDATED: ${EFFECTIVE_DATE} · Operated by ${COMPANY}`}
      intro="These terms are a contract between you and us about using Studia. Plain-English summaries open each section, but the full text is what governs."
    >
      <LegalSection index="01" title="Accepting these terms">
        <p>
          By creating an account or using Studia (the iOS app and
          studiaios.com), you agree to these Terms of Service and our{" "}
          <Link href="/privacy" className="text-accent underline underline-offset-4">
            Privacy Policy
          </Link>
          . If you don&rsquo;t agree, don&rsquo;t use Studia. You must be at
          least 13 years old (or the minimum digital-consent age in your
          region); if you are under 18, you confirm a parent or guardian has
          reviewed these terms.
        </p>
      </LegalSection>

      <LegalSection index="02" title="Your account">
        <p>
          You&rsquo;re responsible for your account and for keeping your
          credentials secure. Provide accurate information, including your
          school if you join one. We may suspend or terminate accounts that
          violate these terms.
        </p>
      </LegalSection>

      <LegalSection index="03" title="Fair play">
        <p>
          Studia is a competition built on proof. By using it you agree not
          to:
        </p>
        <ul>
          <li>
            attempt to deceive verification — staged setups, photos of photos,
            tampering with the camera flow, or otherwise faking study sessions;
          </li>
          <li>
            manipulate leaderboards, streaks, or ranks through automation,
            multiple accounts, or exploits;
          </li>
          <li>harass, impersonate, or target other users;</li>
          <li>
            reverse-engineer the app or interfere with its security features,
            including the app shield.
          </li>
        </ul>
        <p>
          Cheating may result in removed sessions, leaderboard disqualification,
          or account termination.
        </p>
      </LegalSection>

      <LegalSection index="04" title="Studia+ subscriptions">
        <p>
          Studia+ is an optional auto-renewing subscription that unlocks
          additional features such as analytics and deeper session insights.
          Core social features — including school leaderboards — are free and
          are not behind the paywall.
        </p>
        <ul>
          <li>
            <strong>Billing.</strong> Payment is charged to your Apple ID
            through the App Store when you confirm the purchase.
          </li>
          <li>
            <strong>Auto-renewal.</strong> Your subscription renews
            automatically at the end of each period unless you cancel at least
            24 hours before the current period ends. Your Apple ID is charged
            for renewal within 24 hours before the new period starts.
          </li>
          <li>
            <strong>Cancellation.</strong> Manage or cancel anytime in iOS
            Settings → your Apple ID → Subscriptions. Deleting the app does
            not cancel a subscription.
          </li>
          <li>
            <strong>Trials.</strong> Any unused portion of a free trial is
            forfeited when you purchase a subscription.
          </li>
          <li>
            <strong>Refunds.</strong> Purchases are processed by Apple;
            refund requests are handled by Apple under their policies at{" "}
            <a
              href="https://support.apple.com/billing"
              className="text-accent underline underline-offset-4"
            >
              support.apple.com/billing
            </a>
            .
          </li>
          <li>
            <strong>Price changes.</strong> If prices change, Apple will notify
            you and, where required, ask you to consent before charging.
          </li>
        </ul>
      </LegalSection>

      <LegalSection index="05" title="Your content">
        <p>
          You own your proof photos and other content you submit. You grant us
          a limited license to host, process (including AI verification), and
          display that content as needed to operate Studia — for example,
          showing your proof grid or leaderboard entry according to your
          settings. This license ends when you delete the content or your
          account, subject to our deletion timelines.
        </p>
      </LegalSection>

      <LegalSection index="06" title="Our content">
        <p>
          Studia — including its design, branding, and software,
          belongs to {COMPANY} and its licensors. We grant you a personal,
          non-transferable license to use the app on Apple-branded devices you
          own or control, per the App Store terms. This is the standard
          Apple-required EULA scope; Apple is a third-party beneficiary of
          these terms and may enforce them.
        </p>
      </LegalSection>

      <LegalSection index="07" title="The shield, verification, and your grades">
        <p>
          Studia is a focus and motivation tool, not a guarantee. The app
          shield depends on Apple&rsquo;s Screen Time frameworks and may be
          affected by iOS settings or restrictions. The AI verification process makes
          automated judgments that can occasionally be wrong in either
          direction. We provide Studia &ldquo;as is&rdquo; without warranties
          of any kind, and we&rsquo;re not responsible for exam results,
          missed notifications during a session, or rivalries that get out of
          hand.
        </p>
      </LegalSection>

      <LegalSection index="08" title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, {COMPANY} is not liable for
          indirect, incidental, special, consequential, or punitive damages,
          or lost data, arising from your use of Studia. Our total liability
          for any claim is limited to the amount you paid us in the 12 months
          before the claim, or $50 if you paid nothing.
        </p>
      </LegalSection>

      <LegalSection index="09" title="Termination">
        <p>
          You can stop using Studia and delete your account at any time — to
          request deletion, email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-accent underline underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>
          . We may suspend or terminate access for violations of these terms.
          Sections that by their nature should survive (content licenses,
          disclaimers, liability limits) survive termination.
        </p>
      </LegalSection>

      <LegalSection index="10" title="Governing law and changes">
        <p>
          These terms are governed by the laws of the United States, excluding
          conflict-of-law rules. We may update these terms; if changes are
          material we&rsquo;ll notify you in the app, and continued use after
          the effective date constitutes acceptance. Contact:{" "}
          <strong>{CONTACT_EMAIL}</strong>.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
