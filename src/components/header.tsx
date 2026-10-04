"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  Clock,
  Mail,
  Menu,
  Phone,
  PhoneCall,
  X,
} from "lucide-react";
import { CONTACTS, NAV } from "@/lib/contacts";
import { useLeadModal } from "@/components/lead-modal";
import { Logo, LogoMark } from "@/components/logo";
import { MaxIcon, TelegramIcon, WhatsAppIcon } from "@/components/brand-icons";

const MESSENGERS = [
  {
    href: CONTACTS.max,
    label: "MAX",
    Icon: MaxIcon,
    tileCls: "",
    stripCls: "h-4 w-4 rounded-[22%]",
    filled: true,
  },
  {
    href: CONTACTS.whatsapp,
    label: "WhatsApp",
    Icon: WhatsAppIcon,
    tileCls: "bg-wa",
    stripCls: "h-4 w-4",
    filled: false,
  },
  {
    href: CONTACTS.telegram,
    label: "Telegram",
    Icon: TelegramIcon,
    tileCls: "bg-tg",
    stripCls: "h-4 w-4",
    filled: false,
  },
];

export function Header() {
  const pathname = usePathname();
  const { openLead } = useLeadModal();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* Desktop top strip */}
        <div className="hidden bg-ink text-slate-300 lg:block">
          <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 text-[13px] font-semibold xl:px-8">
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-brand" />
                {CONTACTS.hours}
              </span>
              <a
                href={CONTACTS.emailHref}
                className="inline-flex items-center gap-2 py-2 transition hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 text-brand" />
                {CONTACTS.email}
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="mr-1 text-slate-400">Мы в мессенджерах:</span>
              {MESSENGERS.map(({ href, label, Icon, stripCls }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-8 w-8 place-items-center rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  <Icon className={stripCls} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={`border-b transition-all duration-300 ${
            scrolled
              ? "border-line bg-white/92 shadow-lg shadow-ink/5 backdrop-blur-xl"
              : "border-transparent bg-white/85 backdrop-blur-md"
          }`}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:h-[76px] xl:px-8">
            <Logo />

            <nav
              aria-label="Основная навигация"
              className="hidden items-center gap-1 lg:flex"
            >
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`inline-flex h-11 items-center rounded-full px-4 text-[15px] font-bold transition ${
                    isActive(item.href)
                      ? "bg-brand-soft text-brand-strong"
                      : "text-ink-soft hover:bg-paper hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <a
                href={CONTACTS.phoneHref}
                className="hidden items-center gap-2.5 md:flex"
                aria-label={`Позвонить: ${CONTACTS.phoneDisplay}`}
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-soft text-brand-strong">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[15px] font-extrabold tracking-tight text-ink">
                    {CONTACTS.phoneDisplay}
                  </span>
                  <span className="text-xs font-semibold text-ink-faint">
                    Звоните — ответим сразу
                  </span>
                </span>
              </a>

              <button
                type="button"
                onClick={() =>
                  openLead({
                    title: "Заказать звонок",
                    subtitle:
                      "Оставьте номер — перезвоним в течение 15 минут и ответим на все вопросы.",
                    source: "callback",
                  })
                }
                className="hidden h-12 items-center rounded-full bg-brand px-5 text-[15px] font-extrabold text-white shadow-md shadow-brand/30 transition hover:bg-brand-strong active:scale-[0.98] lg:inline-flex"
              >
                Заказать звонок
              </button>

              {/* Mobile call button */}
              <a
                href={CONTACTS.phoneHref}
                aria-label={`Позвонить: ${CONTACTS.phoneDisplay}`}
                className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white shadow-md shadow-brand/30 transition active:scale-95 lg:hidden"
              >
                <PhoneCall className="h-5.5 w-5.5" />
              </a>

              {/* Burger */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Открыть меню"
                aria-expanded={open}
                className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white text-ink transition hover:bg-paper active:scale-95 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex flex-col bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
        >
          <div className="menu-in flex h-16 items-center justify-between border-b border-line px-4 sm:px-6">
            <span className="flex items-center gap-2.5">
              <LogoMark />
              <span className="text-[19px] font-extrabold tracking-tight text-ink">
                Меню
              </span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Закрыть меню"
              className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white text-ink transition hover:bg-paper active:scale-95"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav
            aria-label="Мобильная навигация"
            className="menu-in flex-1 overflow-y-auto px-4 py-4 sm:px-6"
          >
            <ul className="divide-y divide-line">
              {NAV.map((item, i) => (
                <li key={item.href} className="item-in" style={{ animationDelay: `${60 + i * 70}ms` }}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex min-h-[64px] items-center justify-between gap-4 py-2 text-[22px] font-extrabold tracking-tight text-ink"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="text-sm font-extrabold text-brand">
                        0{i + 1}
                      </span>
                      <span className={isActive(item.href) ? "text-brand-strong" : ""}>
                        {item.label}
                      </span>
                    </span>
                    <ChevronRight className="h-6 w-6 text-ink-faint" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="item-in mt-6" style={{ animationDelay: "360ms" }}>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-faint">
                Свяжитесь с нами
              </p>
              <a
                href={CONTACTS.phoneHref}
                className="mt-3 flex h-16 items-center justify-center gap-3 rounded-2xl bg-brand text-lg font-extrabold text-white shadow-lg shadow-brand/30 transition active:scale-[0.99]"
              >
                <PhoneCall className="h-6 w-6" />
                {CONTACTS.phoneDisplay}
              </a>
              <div className="mt-3 grid grid-cols-3 gap-2.5">
                {MESSENGERS.map(({ href, label, Icon, tileCls, filled }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Написать в ${label}`}
                    className={`relative flex h-16 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl text-white ${tileCls} transition active:scale-[0.98]`}
                  >
                    {filled ? (
                      <>
                        <Icon className="absolute inset-0 h-full w-full" />
                        <span className="absolute bottom-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-bold leading-none backdrop-blur-[2px]">
                          {label}
                        </span>
                      </>
                    ) : (
                      <>
                        <Icon className="h-6 w-6" />
                        <span className="text-xs font-bold">{label}</span>
                      </>
                    )}
                  </a>
                ))}
              </div>
              <a
                href={CONTACTS.emailHref}
                className="mt-3 flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border border-line bg-white font-bold text-ink transition active:scale-[0.99]"
              >
                <Mail className="h-5 w-5 text-brand" />
                {CONTACTS.email}
              </a>
              <p className="mt-4 flex items-center justify-center gap-2 pb-6 text-sm font-semibold text-ink-faint">
                <Clock className="h-4 w-4" />
                {CONTACTS.hours}
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
