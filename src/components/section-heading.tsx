import type { ReactNode } from "react";
import Reveal from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "left",
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  desc?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <Reveal
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <p
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] ${
          dark
            ? "bg-white/10 text-brand-soft ring-1 ring-white/15"
            : "bg-brand-soft text-brand-strong"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[42px] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {desc && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? "text-slate-300" : "text-ink-soft"
          }`}
        >
          {desc}
        </p>
      )}
    </Reveal>
  );
}
