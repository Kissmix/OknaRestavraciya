import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  Paintbrush,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/contacts";
import { SERVICES, priceFrom } from "@/lib/services";
import { ServiceCard } from "@/components/service-card";
import { ObjectsSection } from "@/components/objects-section";
import { Calculator } from "@/components/calculator";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Реставрация и утепление окон в квартирах, домах и зданиях",
  description:
    "Вернём тепло, тишину и красивый вид вашим окнам. В 3–4 раза выгоднее замены. Реставрация деревянных окон от 24 000 ₽, утепление от 7 499 ₽. Работаем без пыли и грязи. Выезд на замер — бесплатно.",
  alternates: { canonical: "/" },
};

const HERO_STATS = [
  { value: "в 3–4 раза", label: "выгоднее замены окна" },
  { value: "до 3 лет", label: "гарантии на работы" },
  { value: "1–3 дня", label: "и окно готово" },
];

const WHY: { Icon: LucideIcon; title: string; text: string }[] = [
  {
    Icon: Wallet,
    title: "В 3–4 раза выгоднее замены",
    text: "Реставрация и утепление стоят заметно меньше нового окна с установкой — а результат тот же: тепло и тихо.",
  },
  {
    Icon: Sparkles,
    title: "Без пыли и грязи",
    text: "Укрываем пол, мебель и подоконники плёнкой, работаем аккуратно и убираем за собой. Жить в квартире можно как обычно.",
  },
  {
    Icon: ShieldCheck,
    title: "Гарантия до 3 лет",
    text: "Договор, фиксированная смета до начала работ и официальная гарантия. Если что-то не так — приедем и исправим.",
  },
  {
    Icon: Ruler,
    title: "Бесплатный замер",
    text: "Приедем в удобное время, честно оценим состояние окон и назовём точную цену. Она не вырастет в процессе.",
  },
];

const STEPS: { Icon: LucideIcon; title: string; text: string }[] = [
  {
    Icon: ClipboardList,
    title: "Заявка",
    text: "Позвоните, напишите в мессенджер или оставьте заявку на сайте — перезвоним за 15 минут.",
  },
  {
    Icon: Ruler,
    title: "Замер и смета",
    text: "Мастер приезжает бесплатно, оценивает окна и фиксирует точную цену в договоре.",
  },
  {
    Icon: Paintbrush,
    title: "Работа 1–3 дня",
    text: "Восстанавливаем или утепляем окна аккуратно, без пыли. Утепление — и вовсе за пару часов.",
  },
  {
    Icon: BadgeCheck,
    title: "Приёмка и гарантия",
    text: "Проверяем всё вместе с вами, подписываем акт и выдаём гарантию до 3 лет.",
  },
];

const REVIEWS = [
  {
    name: "Марина",
    tag: "Квартира",
    text: "Заказывала реставрацию двух окон в старом фонде. Очень боялась грязи, но всё укрыли плёнкой, а после работы убрали за собой. Окна как будто вчера поставили — не дует, не свистит, цвет идеальный.",
  },
  {
    name: "Сергей",
    tag: "Дом",
    text: "В доме восемь деревянных окон, уже присматривался к пластику. Оказалось, реставрация в разы дешевле, а вид остался «живой». Сделали за четыре дня. Этой зимой впервые тепло и тихо, спасибо!",
  },
  {
    name: "Ольга",
    tag: "Здание",
    text: "Утепляли окна в подъездах и административной части. Работали строго по графику, без жалоб от жильцов. Договор, акты, гарантия — со всеми документами полный порядок.",
  },
];

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Услуги по реставрации и утеплению окон",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.fullName,
      url: `${SITE_URL}/uslugi/${s.slug}`,
      provider: { "@type": "HomeAndConstructionBusiness", name: SITE_NAME },
      offers: {
        "@type": "Offer",
        price: s.price,
        priceCurrency: "RUB",
      },
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex items-center overflow-hidden rounded-b-[32px] bg-ink sm:rounded-b-[44px]">
        <Image
          src="/images/hero.jpg"
          alt="Светлая комната с отреставрированными белыми деревянными окнами"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/25"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28 xl:px-8">
          <Reveal className="max-w-2xl">
            <div className="flex flex-wrap gap-2">
              {["Без пыли и грязи", "За 1–3 дня", "От 7 499 ₽"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-white/12 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-white ring-1 ring-white/20 backdrop-blur-sm"
                >
                  {chip}
                </span>
              ))}
            </div>
            <h1 className="mt-6 text-[31px] font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[54px]">
              Реставрация и утепление окон в квартирах, домах и зданиях
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
              Вернём тепло, тишину и красивый вид вашим окнам. В 3–4 раза
              выгоднее замены. Работаем без пыли и грязи.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#calculator"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-brand px-7 text-base font-extrabold text-white shadow-xl shadow-brand/40 transition hover:bg-brand-strong active:scale-[0.99]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <path d="M8 6h8M8 11h2.5M13.5 11H16M8 15h2.5M13.5 15H16M8 19h8" />
                </svg>
                Рассчитать стоимость
              </Link>
              <Link
                href="/uslugi"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-7 text-base font-extrabold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-[0.99]"
              >
                Смотреть услуги и цены
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-2.5 sm:gap-4">
              {HERO_STATS.map((s) => (
                <div
                  key={s.value}
                  className="rounded-2xl bg-white/10 p-3.5 ring-1 ring-white/15 backdrop-blur-sm sm:p-5"
                >
                  <dt className="order-2 mt-1 block text-[11px] font-semibold leading-tight text-slate-300 sm:text-xs">
                    {s.label}
                  </dt>
                  <dd className="text-lg font-extrabold tracking-tight text-white sm:text-2xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── Для кого работаем ────────────────────────────────── */}
      <div className="py-16 sm:py-24">
        <ObjectsSection />
      </div>

      {/* ── Услуги ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-paper py-16 sm:py-24">
        <div className="dots-texture absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Наши услуги"
              title="Шесть услуг — и окна снова как новые"
              desc="Реставрируем и красим деревянные окна, утепляем деревянные и пластиковые. Цены честные — «от», а точную сумму называем после бесплатного замера и фиксируем в договоре."
            />
            <Reveal className="hidden sm:block">
              <Link
                href="/uslugi"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-white px-5 text-sm font-extrabold text-ink transition hover:border-brand hover:text-brand-strong"
              >
                Все услуги и цены
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-9 grid gap-5 sm:mt-11 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 110} className="h-full">
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 sm:hidden">
            <Link
              href="/uslugi"
              className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-line bg-white text-base font-extrabold text-ink transition active:scale-[0.99]"
            >
              Все услуги и цены
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Калькулятор ──────────────────────────────────────── */}
      <section
        id="calculator"
        className="scroll-mt-24 bg-white py-16 sm:py-24"
        aria-label="Калькулятор стоимости"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
          <SectionHeading
            align="center"
            eyebrow="Калькулятор стоимости"
            title="Посчитайте сами — это займёт 30 секунд"
            desc="Отметьте галочками нужные услуги и выберите количество кнопками «плюс» и «минус». Итог пересчитывается мгновенно, можно выбрать несколько позиций сразу."
          />
          <div className="mt-10 sm:mt-12">
            <Reveal>
              <Calculator />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Почему мы ────────────────────────────────────────── */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 xl:px-8">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[32px]">
              <Image
                src="/images/craftsman.jpg"
                alt="Мастер аккуратно красит деревянную оконную створку белой краской"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="float-y absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-3xl bg-white p-4 pr-5 shadow-xl shadow-ink/10 ring-1 ring-line sm:left-8 sm:right-auto sm:pr-7">
              <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-brand text-white">
                <Paintbrush className="h-6 w-6" />
              </span>
              <div>
                <p className="text-lg font-extrabold tracking-tight text-ink sm:text-xl">
                  Как новые — не купить, а вернуть
                </p>
                <p className="text-sm font-semibold text-ink-soft">
                  Краска держится 8–10 лет без желтизны
                </p>
              </div>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Почему выбирают нас"
              title="Чинить любимые окна приятнее, чем менять их"
              desc="Деревянные окна старого фонда и хорошие пластиковые не обязаны заканчивать жизнь на помойке. Их можно вернуть к жизни — быстро, аккуратно и заметно дешевле замены."
            />
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {WHY.map((f, i) => (
                <Reveal key={f.title} delay={i * 100}>
                  <div className="h-full rounded-3xl border border-line bg-white p-5 sm:p-6">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand-strong">
                      <f.Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-base font-extrabold tracking-tight text-ink sm:text-lg">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {f.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Как мы работаем ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink py-16 sm:py-24">
        <div
          className="dots-light absolute inset-0 opacity-50"
          aria-hidden="true"
        />
        <div
          className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
          <SectionHeading
            dark
            eyebrow="Как мы работаем"
            title="От заявки до тёплого окна — четыре шага"
            desc="Никакой бюрократии: вы оставляете заявку, мы приезжаем, делаем и оставляем вам тёплые красивые окна и гарантию."
          />
          <div className="mt-9 grid gap-4 sm:mt-11 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 110}>
                <div className="relative h-full rounded-3xl bg-white/6 p-6 ring-1 ring-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-extrabold tracking-tight text-brand">
                      0{i + 1}
                    </span>
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/8 text-slate-200 ring-1 ring-white/10">
                      <step.Icon className="h-5.5 w-5.5" />
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Отзывы ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
          <SectionHeading
            align="center"
            eyebrow="Отзывы"
            title="Что говорят те, у кого уже тепло"
            desc="Нам важно, чтобы вы рекомендовали нас соседям — поэтому делаем аккуратно и отвечаем за результат."
          />
          <div className="mt-9 grid gap-5 sm:mt-11 sm:gap-6 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 110} className="h-full">
                <figure className="flex h-full flex-col rounded-[28px] border border-line bg-white p-6 shadow-sm sm:p-7">
                  <div
                    className="flex gap-1"
                    aria-label="Оценка: 5 из 5"
                    role="img"
                  >
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star
                        key={star}
                        className="h-4.5 w-4.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-soft">
                    «{r.text}»
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-5">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-soft text-base font-extrabold text-brand-strong">
                      {r.name[0]}
                    </span>
                    <div>
                      <p className="font-extrabold tracking-tight text-ink">
                        {r.name}
                      </p>
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-ink-faint">
                        {r.tag}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 xl:px-8">
        <CtaBand />
      </section>
    </>
  );
}
