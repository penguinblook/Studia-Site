import { APP_STORE_URL } from "@/lib/site";

export default function AppStoreButton({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "paper";
  className?: string;
}) {
  const styles =
    variant === "dark"
      ? "bg-ink text-paper hover:bg-blue"
      : "bg-paper text-blue-deep hover:bg-paper-warm";
  return (
    <a
      href={APP_STORE_URL}
      className={`tag inline-flex items-center gap-3 px-6 py-4 transition-colors ${styles} ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current"
      >
        <path d="M17.05 12.54c-.03-2.89 2.36-4.27 2.47-4.34-1.35-1.97-3.44-2.24-4.18-2.27-1.78-.18-3.47 1.05-4.37 1.05-.9 0-2.29-1.02-3.76-1-1.94.03-3.72 1.13-4.72 2.86-2.01 3.49-.51 8.66 1.45 11.49.96 1.39 2.1 2.94 3.6 2.88 1.45-.06 1.99-.93 3.74-.93s2.24.93 3.77.9c1.56-.03 2.54-1.41 3.49-2.8 1.1-1.61 1.55-3.17 1.58-3.25-.04-.02-3.03-1.16-3.07-4.59zM14.17 4.06c.8-.97 1.34-2.32 1.19-3.66-1.15.05-2.55.77-3.38 1.74-.74.85-1.39 2.22-1.22 3.53 1.29.1 2.6-.65 3.41-1.61z" />
      </svg>
      Download on the App Store
    </a>
  );
}
