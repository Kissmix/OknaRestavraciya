"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/services";

export function Faq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div
            key={item.q}
            className={`overflow-hidden rounded-3xl border bg-white transition duration-300 ${
              open ? "border-brand/40 shadow-lg shadow-ink/6" : "border-line"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex min-h-[64px] w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-7"
            >
              <span className="flex items-center gap-3.5 text-base font-extrabold leading-snug tracking-tight text-ink sm:text-lg">
                <span
                  className={`hidden h-2 w-2 shrink-0 rounded-full sm:block ${
                    open ? "bg-brand" : "bg-line"
                  }`}
                  aria-hidden="true"
                />
                {item.q}
              </span>
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition duration-300 ${
                  open
                    ? "rotate-180 bg-brand text-white"
                    : "bg-paper text-ink-soft ring-1 ring-line"
                }`}
              >
                <ChevronDown className="h-5 w-5" />
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 text-[15px] leading-relaxed text-ink-soft sm:px-7 sm:pl-[52px] sm:text-base">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
