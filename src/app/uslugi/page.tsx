import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, FileCheck2, Info } from "lucide-react";
import { SERVICE_GROUPS, SERVICES } from "@/lib/services";
import { ServiceCard } from "@/components/service-card";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Услуги и цены на реставрацию и утепление окон",
  description:
    "Все услуги и цены: реставрация, ремонт и покраска деревянных окон от 24 000 ₽, утепление деревянных и пластиковых окон от 7 499 ₽. Работаем в квартирах, домах и зданиях. Замер бесплатно.",
  alternates: { canonical: "/uslugi" },
};

export default function ServicesPage() {
  return (
    <>
      {/* ── Заголовок ────────────────────────────────────────── */}
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
                Услуги и цены
              </li>
            </ol>
          </nav>
          <Reveal>
            <h1 className="mt-5 max-w-3xl text-[32px] font-extrabold leading-[1.12] tracking-tight text-ink sm:text-5xl">
              Услуги и цены на реставрацию и утепление окон
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Честные цены без «сюрпризов»: мастер бесплатно приезжает на
              замер, считает точную смету и фиксирует её в договоре. Цена не
              меняется до конца работ.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-7">
            <p className="flex max-w-3xl items-start gap-3 rounded-3xl border border-brand/25 bg-brand-soft p-4 text-sm leading-relaxed text-brand-strong sm:p-5 sm:text-[15px]">
              <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <span>
                <span className="font-extrabold">Что значит цена «от»?</span>{" "}
                Это стоимость для окна в обычном состоянии. Если дерево сильно
                повреждено или нужна замена стёкол — мастер честно скажет об
                этом на замере и посчитает всё заранее.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Группы услуг ─────────────────────────────────────── */}
      {SERVICE_GROUPS.map((group, gi) => (
        <section
          key={group.id}
          className={gi % 2 === 0 ? "py-14 sm:py-20" : "bg-paper py-14 sm:py-20"}
          aria-labelledby={`group-${group.id}`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
            <Reveal className="max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-brand-strong">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-brand"
                  aria-hidden="true"
                />
                Группа {gi + 1}
              </p>
              <h2
                id={`group-${group.id}`}
                className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl"
              >
                {group.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                {group.description}
              </p>
            </Reveal>
            <div className="mt-9 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.filter((s) => s.group === group.id).map((s, i) => (
                <Reveal key={s.slug} delay={(i % 3) * 110} className="h-full">
                  <ServiceCard service={s} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── Договор ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 xl:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-5 rounded-[28px] border border-line bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand-strong">
              <FileCheck2 className="h-7 w-7" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                Работаем по договору — для квартир, домов и зданий
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                Смета, график и гарантия фиксируются письменно. Для зданий
                предоставляем все закрывающие документы: акты выполненных
                работ, счета и гарантийные талоны.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 xl:px-8">
        <CtaBand
          title="Не нашли подходящую услугу?"
          desc="Позвоните или оставьте заявку — честно подскажем, что нужно именно вашим окнам, и посчитаем индивидуальную смету после бесплатного замера."
        />
      </section>
    </>
  );
}
