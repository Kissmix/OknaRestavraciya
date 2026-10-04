"use client";

import { Phone, Send } from "lucide-react";
import { CONTACTS } from "@/lib/contacts";
import { useLeadModal } from "@/components/lead-modal";
import { MaxIcon, TelegramIcon, WhatsAppIcon } from "@/components/brand-icons";
import Reveal from "@/components/reveal";

export function CtaBand({
  title = "Рассчитайте стоимость за 1 минуту",
  desc = "Оставьте заявку или позвоните — ответим на вопросы, подскажем по цене и договоримся о бесплатном замере в удобное время.",
  service,
  message,
}: {
  title?: string;
  desc?: string;
  service?: string;
  message?: string;
}) {
  const { openLead } = useLeadModal();

  return (
    <Reveal>
      <section className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-10 sm:rounded-[36px] sm:px-10 sm:py-14 lg:px-14">
        <div
          className="dots-light absolute inset-0 opacity-60"
          aria-hidden="true"
        />
        <div
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-brand/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              {desc}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openLead({ service, message, source: "cta" })}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-brand px-7 text-base font-extrabold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-strong active:scale-[0.99]"
              >
                <Send className="h-5 w-5" />
                Оставить заявку
              </button>
              <a
                href={CONTACTS.phoneHref}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-7 text-base font-extrabold text-white transition hover:bg-white/10 active:scale-[0.99]"
              >
                <Phone className="h-5 w-5" />
                {CONTACTS.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="shrink-0 lg:text-right">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
              Или напишите — отвечаем быстро
            </p>
            <div className="mt-4 flex gap-2.5 lg:justify-end">
              <a
                href={CONTACTS.max}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать в MAX"
                className="grid h-14 w-14 place-items-center rounded-2xl bg-max text-white transition hover:brightness-110 active:scale-95"
              >
                <MaxIcon className="h-6 w-6" />
              </a>
              <a
                href={CONTACTS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать в WhatsApp"
                className="grid h-14 w-14 place-items-center rounded-2xl bg-wa text-white transition hover:brightness-105 active:scale-95"
              >
                <WhatsAppIcon className="h-6 w-6" />
              </a>
              <a
                href={CONTACTS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать в Telegram"
                className="grid h-14 w-14 place-items-center rounded-2xl bg-tg text-white transition hover:brightness-110 active:scale-95"
              >
                <TelegramIcon className="h-6 w-6" />
              </a>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-400">
              {CONTACTS.hours}
            </p>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
