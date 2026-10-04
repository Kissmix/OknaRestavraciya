import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ChevronRight,
  Clock3,
  FileCheck2,
  Gem,
  HeartHandshake,
  Leaf,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { ObjectsSection } from "@/components/objects-section";
import { CtaBand } from "@/components/cta-band";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "О компании — реставрация и утепление окон с 10-летним опытом",
  description:
    "Команда мастеров по реставрации, ремонту, покраске и утеплению окон. Более 10 лет опыта и 1 200 восстановленных окон в квартирах, домах и зданиях. Договор, смета, гарантия до 3 лет.",
  alternates: { canonical: "/o-kompanii" },
};

const STATS = [
  { value: "10+ лет", label: "опыта наших мастеров" },
  { value: "1 200+", label: "окон восстановлено" },
  { value: "9 из 10", label: "клиентов рекомендуют нас" },
  { value: "до 3 лет", label: "гарантии на работы" },
];

const PRINCIPLES: { Icon: LucideIcon; title: string; text: string }[] = [
  {
    Icon: FileCheck2,
    title: "Честная смета",
    text: "Называем точную цену после замера и фиксируем её в договоре. Никаких «ой, а это ещё плюс…» в середине работ.",
  },
  {
    Icon: Sparkles,
    title: "Аккуратность",
    text: "Укрываем плёнкой всё, что можно запачкать, работаем носилками не гремим и шутим тихо. После нас чисто.",
  },
  {
    Icon: Clock3,
    title: "Сроки в договоре",
    text: "Утепление — за 2–6 часов, реставрация — за 1–3 дня. Если задержим по нашей вине — сделаем скидку.",
  },
  {
    Icon: HeartHandshake,
    title: "Гарантия и поддержка",
    text: "До 3 лет гарантии на работы. Что-то пошло не так — приезжаем и исправляем бесплатно, без споров.",
  },
  {
    Icon: Leaf,
    title: "Бережное отношение к дереву",
    text: "Старое качественное дерево лучше нового пластика: дышит, тёплое, красивое. Мы его не ломаем — мы его лечим.",
  },
  {
    Icon: Gem,
    title: "Материалы, за которые не стыдно",
    text: "Краски, уплотнители и фурнитура проверенных производителей. То, что поставили бы себе домой.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
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
                О компании
              </li>
            </ol>
          </nav>
          <div className="mt-7 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <Reveal>
              <h1 className="text-[32px] font-extrabold leading-[1.12] tracking-tight text-ink sm:text-5xl">
                Мы лечим окна, а не отправляем их на помойку
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                Мы — небольшая команда мастеров-реставраторов. Больше десяти
                лет возвращаем деревянным и пластиковым окнам тепло, тишину
                и красивый вид — и до сих пор искренне радуемся, когда очередное
                «безнадёжное» окно начинает выглядеть как новое.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                Начинали с квартир в старом фонде, сегодня работаем и с
                частными домами, и с большими зданиями. Подход не изменился:
                честная смета, аккуратные руки и гарантия, за которую отвечаем
                именем.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] shadow-xl shadow-ink/10">
                <Image
                  src="/images/workshop.jpg"
                  alt="Наша мастерская: деревянные оконные рамы в процессе реставрации"
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Статистика */}
          <Reveal delay={200} className="mt-12">
            <dl className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.value}
                  className="rounded-3xl border border-line bg-white p-5 sm:p-7"
                >
                  <dd className="text-2xl font-extrabold tracking-tight text-brand-strong sm:text-4xl">
                    {s.value}
                  </dd>
                  <dt className="mt-2 text-sm font-semibold leading-snug text-ink-soft">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── Принципы ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
          <Reveal className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-brand-strong">
              <span
                className="h-1.5 w-1.5 rounded-full bg-brand"
                aria-hidden="true"
              />
              Как мы работаем
            </p>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              Наши принципы — простые и выполнимые
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Это не лозунги с вывески, а то, по чему нас легко проверить —
              прямо в процессе работы.
            </p>
          </Reveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 100} className="h-full">
                <article className="h-full rounded-3xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-ink/8 sm:p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand-strong">
                    <p.Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                    {p.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Объекты ──────────────────────────────────────────── */}
      <div className="bg-paper py-14 sm:py-20">
        <ObjectsSection
          eyebrow="Наши объекты"
          title="Работаем в квартирах, домах и зданиях"
          desc="Формат объекта влияет только на организацию: где-то важна тишина в час детского сна, где-то — работа по графику управляющей компании. Качество везде одинаковое."
        />
      </div>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 xl:px-8">
        <CtaBand
          title="Познакомимся на бесплатном замере?"
          desc="Приедем в удобное время, посмотрим ваши окна и честно скажем, что можно спасти, а что нет. Это ни к чему не обязывает."
        />
      </section>
    </>
  );
}
