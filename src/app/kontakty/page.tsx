import Link from "next/link";
import type { Metadata } from "next";
import {
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  PhoneCall,
  Ruler,
} from "lucide-react";
import { CONTACTS } from "@/lib/contacts";
import { LeadForm } from "@/components/lead-modal";
import { MaxIcon, TelegramIcon, WhatsAppIcon } from "@/components/brand-icons";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Контакты — позвоните или напишите, замер бесплатно",
  description:
    "Свяжитесь с нами удобным способом: телефон +7 933 170 82 07, почта alega783@mail.ru, MAX, WhatsApp или Telegram. Выезд мастера на замер — бесплатно. Работаем ежедневно с 8:00 до 21:00.",
  alternates: { canonical: "/kontakty" },
};

const CHANNELS = [
  {
    label: "Телефон",
    value: CONTACTS.phoneDisplay,
    hint: "Звоните — ответим сразу и ответим по делу",
    href: CONTACTS.phoneHref,
    Icon: PhoneCall,
    tile: "bg-brand text-white",
    external: false,
    highlight: true,
  },
  {
    label: "Электронная почта",
    value: CONTACTS.email,
    hint: "Ответим в течение рабочего дня",
    href: CONTACTS.emailHref,
    Icon: Mail,
    tile: "bg-ink text-white",
    external: false,
    highlight: false,
  },
  {
    label: "MAX",
    value: "Написать в MAX",
    hint: "Можно скинуть фото окна — посоветуем сразу",
    href: CONTACTS.max,
    Icon: MaxIcon,
    tile: "bg-max text-white",
    external: true,
    highlight: false,
  },
  {
    label: "WhatsApp",
    value: "Написать в WhatsApp",
    hint: "Быстренько обсудим вашу задачу",
    href: CONTACTS.whatsapp,
    Icon: WhatsAppIcon,
    tile: "bg-wa text-white",
    external: true,
    highlight: false,
  },
  {
    label: "Telegram",
    value: "Написать в Telegram",
    hint: "Обычно отвечаем в течение 15 минут",
    href: CONTACTS.telegram,
    Icon: TelegramIcon,
    tile: "bg-tg text-white",
    external: true,
    highlight: false,
  },
];

export default function ContactsPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 xl:px-8">
          <nav aria-label="Хлебные крошки">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-ink-faint">
              <li>
                <Link
                  href="/"
                  className="inline-flex min-h-[44px] items-center transition hover:text-brand-strong"
                >
                  Главная
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li aria-current="page" className="text-ink">
                Контакты
              </li>
            </ol>
          </nav>
          <Reveal>
            <h1 className="mt-5 text-[32px] font-extrabold leading-[1.12] tracking-tight text-ink sm:text-5xl">
              Контакты
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Выбирайте удобный способ — звонок, письмо или мессенджер.
              Отвечаем ежедневно с 8:00 до 21:00, без выходных.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2.5 text-sm font-extrabold text-brand-strong">
              <Clock3 className="h-4.5 w-4.5" aria-hidden="true" />
              {CONTACTS.hours}, без обеда и выходных
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 xl:px-8">
          {/* Способы связи */}
          <div>
            <Reveal>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Связаться удобным способом
              </h2>
            </Reveal>
            <ul className="mt-6 space-y-3">
              {CHANNELS.map((c, i) => (
                <Reveal key={c.label} delay={i * 70}>
                  <li>
                    <a
                      href={c.href}
                      {...(c.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={`group flex min-h-[84px] items-center gap-4 rounded-3xl border p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/8 sm:min-h-[92px] sm:p-5 ${
                        c.highlight
                          ? "border-brand/40 bg-brand-soft/60"
                          : "border-line bg-white hover:border-brand/35"
                      }`}
                    >
                      <span
                        className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition group-hover:scale-105 sm:h-16 sm:w-16 ${c.tile}`}
                        aria-hidden="true"
                      >
                        <c.Icon className="h-7 w-7" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-extrabold uppercase tracking-[0.12em] text-ink-faint">
                          {c.label}
                        </span>
                        <span className="mt-0.5 block break-words text-lg font-extrabold tracking-tight text-ink sm:text-xl">
                          {c.value}
                        </span>
                        <span className="mt-0.5 block text-sm font-semibold text-ink-soft">
                          {c.hint}
                        </span>
                      </span>
                      <ChevronRight
                        className="h-6 w-6 shrink-0 text-ink-faint transition group-hover:translate-x-1 group-hover:text-brand"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200} className="mt-6">
              <div className="flex items-start gap-4 rounded-3xl border border-line bg-paper p-5 sm:p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-brand-strong ring-1 ring-line">
                  <Ruler className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-extrabold tracking-tight text-ink">
                    Выезд на замер — бесплатно
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    Приезжаем в удобное для вас время, всё замеряем, честно
                    оцениваем состояние окон и называем точную цену. Замер ни к
                    чему не обязывает.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Форма */}
          <Reveal delay={150}>
            <div
              id="form"
              className="scroll-mt-28 rounded-[32px] border border-line bg-white p-6 shadow-xl shadow-ink/6 sm:p-8"
            >
              <LeadForm
                showMessage
                payload={{
                  title: "Форма быстрой связи",
                  subtitle:
                    "Напишите пару слов о задаче и оставьте телефон — перезвоним и всё обсудим. Поля оптимизированы под ввод с телефона.",
                  source: "contacts_page",
                }}
              />
              <p className="mt-5 flex items-start gap-2.5 border-t border-line pt-5 text-sm leading-relaxed text-ink-soft">
                <MapPin
                  className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand"
                  aria-hidden="true"
                />
                Выезжаем на объекты любого масштаба: квартиры, дома и здания.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
