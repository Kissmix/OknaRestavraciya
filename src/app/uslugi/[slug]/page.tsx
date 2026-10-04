import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Home,
  Landmark,
  Phone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { CONTACTS, SITE_NAME, SITE_URL } from "@/lib/contacts";
import {
  SERVICE_GROUPS,
  SERVICES,
  getService,
  priceFrom,
} from "@/lib/services";
import { Faq } from "@/components/faq";
import { OrderButton } from "@/components/order-button";
import { CtaBand } from "@/components/cta-band";
import Reveal from "@/components/reveal";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.seoTitle.replace(` | ${SITE_NAME}`, ""),
    description: service.seoDesc,
    alternates: { canonical: `/uslugi/${service.slug}` },
  };
}

const OBJECT_FIT: { title: string; text: string; Icon: LucideIcon }[] = [
  {
    title: "Квартиры",
    text: "Студии, однушки и многокомнатные квартиры, новостройки и старый фонд. Работаем аккуратно — жить дома можно как обычно.",
    Icon: Building2,
  },
  {
    title: "Дома",
    text: "Коттеджи, дачи, таунхаусы и деревянные дома. Сохраняем внешний вид окон и характер дома.",
    Icon: Home,
  },
  {
    title: "Здания",
    text: "Многоквартирные, административные, коммерческие и исторические здания. Договор, график и документы.",
    Icon: Landmark,
  },
];

const HERO_PERKS = [
  { Icon: Sparkles, label: "Без пыли и грязи" },
  { Icon: BadgeCheck, label: "Гарантия до 3 лет" },
  { Icon: Clock3, label: "Договор и смета" },
];

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const group = SERVICE_GROUPS.find((g) => g.id === service.group);
  const others = SERVICES.filter((s) => s.slug !== service.slug);
  const heroImg =
    service.group === "restavraciya"
      ? "/images/craftsman.jpg"
      : "/images/uteplenie.jpg";
  const heroAlt =
    service.group === "restavraciya"
      ? `${service.fullName} — мастер красит створку белой краской`
      : `${service.fullName} — установка нового уплотнителя по контуру створки`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.fullName,
    description: service.intro,
    url: `${SITE_URL}/uslugi/${service.slug}`,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: SITE_NAME,
      telephone: "+7 933 170-82-07",
      email: CONTACTS.email,
    },
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Услуги и цены",
        item: `${SITE_URL}/uslugi`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${SITE_URL}/uslugi/${service.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── Hero услуги ──────────────────────────────────────── */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 xl:px-8">
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
              <li>
                <Link
                  href="/uslugi"
                  className="inline-flex min-h-[44px] items-center transition hover:text-brand-strong"
                >
                  Услуги и цены
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li aria-current="page" className="text-ink">
                {service.name}
              </li>
            </ol>
          </nav>

          <div className="mt-7 grid items-start gap-9 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-brand-strong">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-brand"
                  aria-hidden="true"
                />
                {group?.shortTitle}
              </p>
              <h1 className="mt-4 text-[28px] font-extrabold leading-[1.14] tracking-tight text-ink sm:text-4xl lg:text-[42px]">
                {service.fullName}
              </h1>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-3xl font-extrabold tracking-tight text-brand-strong sm:text-4xl">
                  {priceFrom(service.price)}
                </span>
                <span className="text-sm font-bold text-ink-faint">
                  {service.time}
                </span>
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                {service.intro}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <OrderButton
                  label="Заказать услугу"
                  payload={{
                    title: "Заказ услуги",
                    subtitle:
                      "Перезвоним, ответим на вопросы и договоримся о бесплатном замере.",
                    service: `${service.fullName} — ${priceFrom(service.price)}`,
                    message: `Здравствуйте! Интересует услуга «${service.fullName}» (${priceFrom(service.price)}). Прошу связаться со мной.`,
                    source: "service_page",
                  }}
                  className="w-full sm:w-auto"
                />
                <a
                  href={CONTACTS.phoneHref}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-line bg-white px-7 text-base font-extrabold text-ink transition hover:border-brand hover:text-brand-strong active:scale-[0.99]"
                >
                  <Phone className="h-5 w-5" />
                  {CONTACTS.phoneDisplay}
                </a>
              </div>
              <ul className="mt-7 flex flex-wrap gap-2">
                {HERO_PERKS.map(({ Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink-soft"
                  >
                    <Icon className="h-4.5 w-4.5 text-brand" />
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] shadow-xl shadow-ink/10">
                  <Image
                    src={heroImg}
                    alt={heroAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <ul className="relative z-10 mx-4 -mt-9 grid gap-2 rounded-3xl bg-white p-5 shadow-xl shadow-ink/10 ring-1 ring-line sm:mx-6 sm:grid-cols-3 sm:gap-3">
                  <li className="rounded-2xl bg-paper p-3.5 text-center">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-ink-faint">
                      Срок работ
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-ink">
                      {service.time.replace(/^Обычно занимает /, "")}
                    </p>
                  </li>
                  <li className="rounded-2xl bg-paper p-3.5 text-center">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-ink-faint">
                      Объекты
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-ink">
                      Квартиры, дома, здания
                    </p>
                  </li>
                  <li className="rounded-2xl bg-paper p-3.5 text-center">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-ink-faint">
                      Замер
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-brand-strong">
                      Бесплатно
                    </p>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Что входит ───────────────────────────────────────── */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
          <Reveal className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-brand-strong">
              <span
                className="h-1.5 w-1.5 rounded-full bg-brand"
                aria-hidden="true"
              />
              Состав работ
            </p>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              Что входит в стоимость
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Всё по чек-листу: ничего не «забудем» и не допросим сверх
              сметы. Если что-то не понадобится — вычтем это при замере.
            </p>
          </Reveal>
          <ul className="mt-9 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {service.includes.map((item, i) => (
              <Reveal key={item} delay={(i % 4) * 70}>
                <li className="flex h-full items-start gap-3 rounded-2xl border border-line bg-white p-4 sm:p-5">
                  <CheckCircle2
                    className="mt-0.5 h-5.5 w-5.5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <span className="text-[15px] font-semibold leading-relaxed text-ink">
                    {item}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Для каких объектов ───────────────────────────────── */}
      <section className="bg-paper py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
          <Reveal className="max-w-3xl">
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              Для каких объектов подходит
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Услуга одинаково востребована в квартирах, домах и зданиях —
              отличия только в объёме работ и организации удобного графика.
            </p>
          </Reveal>
          <div className="mt-9 grid gap-4 sm:gap-5 md:grid-cols-3">
            {OBJECT_FIT.map((o, i) => (
              <Reveal key={o.title} delay={i * 100} className="h-full">
                <article className="h-full rounded-3xl border border-line bg-white p-6 sm:p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand-strong">
                    <o.Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink">
                    {o.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                    {o.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Как проходит работа ──────────────────────────────── */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
          <Reveal className="max-w-3xl">
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              Как проходит работа
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Понятный процесс без сюрпризов: вы всегда знаете, что происходит
              и когда окно будет готово.
            </p>
          </Reveal>
          <ol className="mt-9 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 100} className="h-full">
                <li className="relative h-full rounded-3xl border border-line bg-white p-6">
                  <span className="text-4xl font-extrabold tracking-tight text-brand">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 text-base font-extrabold tracking-tight text-ink sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {step.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="bg-paper py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.35fr] lg:gap-14 xl:px-8">
          <Reveal>
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              Частые вопросы
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Собрали то, о чём спрашивают чаще всего. Не нашли свой вопрос —
              позвоните, объясним простыми словами.
            </p>
            <div className="mt-7 rounded-[28px] border border-brand/25 bg-brand-soft p-6 sm:p-7">
              <p className="text-lg font-extrabold tracking-tight text-ink">
                Остались вопросы?
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                Позвоните или напишите — проконсультируем бесплатно и без
                навязчивых продаж.
              </p>
              <a
                href={CONTACTS.phoneHref}
                className="mt-5 inline-flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-brand px-6 text-base font-extrabold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-strong active:scale-[0.99] sm:w-auto"
              >
                <Phone className="h-5 w-5" />
                Задать вопрос
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Faq items={service.faq} />
          </Reveal>
        </div>
      </section>

      {/* ── Другие услуги ────────────────────────────────────── */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-5">
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
              Смотрите также
            </h2>
            <Link
              href="/uslugi"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-line bg-white px-5 text-sm font-extrabold text-ink transition hover:border-brand hover:text-brand-strong"
            >
              Все услуги и цены
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.slice(0, 6).map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/uslugi/${s.slug}`}
                  className="group flex min-h-[72px] items-center justify-between gap-4 rounded-2xl border border-line bg-white p-4 pl-5 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-ink/6"
                >
                  <span>
                    <span className="block text-[15px] font-extrabold leading-snug tracking-tight text-ink transition group-hover:text-brand-strong">
                      {s.name}
                    </span>
                    <span className="mt-1 block text-sm font-bold text-brand-strong">
                      {priceFrom(s.price)}
                    </span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper text-ink-soft ring-1 ring-line transition group-hover:bg-brand group-hover:text-white">
                    <ArrowRight className="h-4.5 w-4.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 xl:px-8">
        <CtaBand
          title={`Заказать: ${service.name}`}
          desc={`${service.time}. Оставьте заявку или позвоните — договоримся о бесплатном замере и назовём точную цену.`}
          service={`${service.fullName} — ${priceFrom(service.price)}`}
          message={`Здравствуйте! Интересует услуга «${service.fullName}» (${priceFrom(service.price)}). Прошу связаться со мной.`}
        />
      </section>
    </>
  );
}
