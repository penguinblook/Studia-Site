import { APP_STORE_URL } from "@/lib/site";

const BADGE = {
  // Official Apple marketing-tools badges.
  // dark  -> black badge (use on light backgrounds)
  // paper -> white badge (use on dark backgrounds)
  dark: "https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1782518400",
  paper:
    "https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1782518400",
};

export default function AppStoreButton({
  variant = "dark",
  className = "",
  imgClassName = "h-[52px]",
}: {
  variant?: "dark" | "paper";
  className?: string;
  imgClassName?: string;
}) {
  return (
    <a
      href={APP_STORE_URL}
      aria-label="Download on the App Store"
      className={`inline-block transition-opacity hover:opacity-80 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BADGE[variant]}
        alt="Download on the App Store"
        className={`w-auto align-middle ${imgClassName}`}
        style={{ objectFit: "contain" }}
      />
    </a>
  );
}
