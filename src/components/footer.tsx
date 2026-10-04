import Link from "next/link";
import { Clock, Mail, Phone } from "lucide-react";
import { CONTACTS, NAV, SITE_NAME, SITE_TAGLINE } from "@/lib/contacts";
import { SERVICES } from "@/lib/services";
import { Logo } from "@/components/logo";
import { MaxIcon, TelegramIcon, WhatsAppIcon } from "@/components/brand-icons";

const MESSENGERS = [
  { href: CONTACTS.max, label: "MAX", Icon: MaxIcon, iconCls: "h-5 w-5 rounded-[22%]" },
  { href: CONTACTS.whatsapp, label: "WhatsApp", Icon: WhatsAppIcon, iconCls: "h-5 w-5" },
  { href: CONTACTS.telegram, label: "Telegram", Icon: TelegramIcon, iconCls: "h-5 w-5" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16 xl:px-8">
        <div className="grid gap-11 md:grid-cols-2 lg:grid-cols-[1.35fr_0.85fr_1.2fr_1.2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-slate-400">
              {SITE_TAGLINE} в квартирах, домах и зданиях. Бережно
              восстанавливаем деревянные окна и избавляем от сквозняков —
              без пыли, грязи и лишних трат.
            </p>
            <div className="mt-6 flex gap-2.5">
              <a
                href={CONTACTS.phoneHref}
                aria-label={`Позвонить: ${CONTACTS.phoneDisplay}`}
                className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white transition hover:bg-brand-strong active:scale-95"
              >
                <Phone className="h-5 w-5" />
              </a>
              {MESSENGERS.map(({ href, label, Icon, iconCls }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Написать в ${label}`}
                  className="grid h-12 w-12 place-items-center rounded-full bg-white/8 text-slate-300 ring-1 ring-white/10 transition hover:bg-white/15 hover:text-white active:scale-95"
                >
                  <Icon className={iconCls} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Навигация в подвале">
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-slate-500">
              Меню
            </p>
            <ul className="mt-4 space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center font-bold text-slate-300 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Услуги в подвале">
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-slate-500">
              Услуги и цены
            </p>
            <ul className="mt-4 space-y-1">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/uslugi/${s.slug}`}
                    className="inline-flex min-h-[44px] items-center text-[15px] font-semibold text-slate-400 transition hover:text-white"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-slate-500">
              Контакты
            </p>
            <a
              href={CONTACTS.phoneHref}
              className="mt-4 inline-flex min-h-[44px] items-center text-xl font-extrabold tracking-tight text-white transition hover:text-brand"
            >
              {CONTACTS.phoneDisplay}
            </a>
            <a
              href={CONTACTS.emailHref}
              className="mt-2 flex min-h-[44px] items-center gap-2 font-semibold text-slate-300 transition hover:text-white"
            >
              <Mail className="h-4.5 w-4.5 shrink-0 text-brand" />
              {CONTACTS.email}
            </a>
            <p className="mt-2 flex min-h-[44px] items-center gap-2 text-sm font-semibold text-slate-400">
              <Clock className="h-4.5 w-4.5 shrink-0 text-brand" />
              {CONTACTS.hours}, без обеда и выходных
            </p>
            <p className="mt-4 rounded-2xl bg-white/5 p-4 text-sm leading-relaxed text-slate-400 ring-1 ring-white/10">
              Выезд мастера на замер и расчёт сметы —{" "}
              <span className="font-bold text-white">бесплатно</span>.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE_NAME}. {SITE_TAGLINE}.
          </p>
          <p>Работаем с квартирами, домами и зданиями.</p>
        </div>
      </div>
    </footer>
  );
}
