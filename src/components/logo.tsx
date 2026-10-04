import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/contacts";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-white shadow-md shadow-brand/30 ${className}`}
      aria-hidden="true"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      >
        <rect x="3.5" y="3" width="17" height="18" rx="2.5" />
        <path d="M12 3v18M3.5 12h17" />
      </svg>
    </span>
  );
}

export function Logo({
  tone = "dark",
  withLink = true,
}: {
  tone?: "dark" | "light";
  withLink?: boolean;
}) {
  const content = (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={`text-[19px] font-extrabold tracking-tight ${
            tone === "light" ? "text-white" : "text-ink"
          }`}
        >
          {SITE_NAME}
        </span>
        <span
          className={`mt-1 text-[10.5px] font-bold uppercase tracking-[0.14em] ${
            tone === "light" ? "text-slate-400" : "text-ink-faint"
          }`}
        >
          {SITE_TAGLINE}
        </span>
      </span>
    </span>
  );

  if (!withLink) return content;

  return (
    <Link
      href="/"
      className="inline-flex min-h-12 items-center"
      aria-label={`${SITE_NAME} — на главную`}
    >
      {content}
    </Link>
  );
}
