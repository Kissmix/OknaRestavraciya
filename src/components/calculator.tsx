"use client";

import { useState } from "react";
import { Check, Info, Minus, Plus, Send } from "lucide-react";
import {
  SERVICE_GROUPS,
  SERVICES,
  formatPrice,
  priceFrom,
} from "@/lib/services";
import { useLeadModal } from "@/components/lead-modal";

type CalcState = Record<string, { on: boolean; qty: number }>;

const initialState = (): CalcState =>
  Object.fromEntries(SERVICES.map((s) => [s.slug, { on: false, qty: 1 }]));

export function Calculator() {
  const { openLead } = useLeadModal();
  const [state, setState] = useState<CalcState>(initialState);

  const toggle = (slug: string) =>
    setState((prev) => ({
      ...prev,
      [slug]: { ...prev[slug], on: !prev[slug].on },
    }));

  const changeQty = (slug: string, delta: number) =>
    setState((prev) => {
      const cur = prev[slug];
      const qty = Math.min(20, Math.max(1, cur.qty + delta));
      return { ...prev, [slug]: { on: true, qty } };
    });

  const selected = SERVICES.filter((s) => state[s.slug].on);
  const total = selected.reduce(
    (sum, s) => sum + s.price * state[s.slug].qty,
    0
  );

  const buildMessage = () => {
    if (!selected.length) {
      return "Здравствуйте! Хочу получить точный расчёт стоимости работ по окнам.";
    }
    const lines = selected.map(
      (s) =>
        `• ${s.name} — ${state[s.slug].qty} шт. × ${formatPrice(s.price)}`
    );
    return `Здравствуйте! Посчитал(а) в калькуляторе на сайте:\n${lines.join(
      "\n"
    )}\nПредварительный итог: ${formatPrice(total)}`;
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="space-y-8">
        {SERVICE_GROUPS.map((group) => (
          <div key={group.id}>
            <h3 className="flex items-center gap-3 text-lg font-extrabold tracking-tight text-ink sm:text-xl">
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
              <span>{group.shortTitle}</span>
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
            </h3>
            <div className="mt-4 space-y-3">
              {SERVICES.filter((s) => s.group === group.id).map((s) => {
                const st = state[s.slug];
                const on = st.on;
                return (
                  <div
                    key={s.slug}
                    className={`rounded-3xl border-2 bg-white p-4 transition duration-300 sm:p-5 ${
                      on
                        ? "border-brand shadow-lg shadow-brand/12"
                        : "border-line hover:border-brand/35"
                    }`}
                  >
                    <div className="sm:flex sm:items-center sm:justify-between sm:gap-5">
                      <label className="flex min-h-[48px] cursor-pointer items-center gap-3.5">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={on}
                          onChange={() => toggle(s.slug)}
                          aria-label={`Выбрать услугу: ${s.name}`}
                        />
                        <span
                          aria-hidden="true"
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl border-2 transition duration-200 ${
                            on
                              ? "border-brand bg-brand text-white"
                              : "border-line bg-paper text-transparent"
                          }`}
                        >
                          <Check className="h-5 w-5" strokeWidth={3} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[15px] font-extrabold leading-snug tracking-tight text-ink sm:text-base">
                            {s.name}
                          </span>
                          <span className="mt-1 block text-sm font-bold text-brand-strong">
                            {priceFrom(s.price)}{" "}
                            <span className="font-semibold text-ink-faint">
                              / за 1 шт.
                            </span>
                          </span>
                        </span>
                      </label>

                      <div className="mt-3.5 flex items-center justify-between gap-3 sm:mt-0 sm:justify-end">
                        <p
                          className={`text-sm font-extrabold transition ${
                            on ? "text-ink" : "text-transparent"
                          } sm:hidden`}
                          aria-hidden={!on}
                        >
                          {on ? `= ${formatPrice(s.price * st.qty)}` : "—"}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => changeQty(s.slug, -1)}
                            disabled={st.qty <= 1}
                            aria-label={`Уменьшить количество: ${s.name}`}
                            className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-white text-ink transition hover:border-brand hover:text-brand-strong active:scale-95 disabled:opacity-35 disabled:hover:border-line disabled:hover:text-ink"
                          >
                            <Minus className="h-5 w-5" />
                          </button>
                          <span
                            aria-live="polite"
                            className="w-9 text-center text-lg font-extrabold tabular-nums text-ink"
                          >
                            {st.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => changeQty(s.slug, 1)}
                            disabled={st.qty >= 20}
                            aria-label={`Увеличить количество: ${s.name}`}
                            className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-white text-ink transition hover:border-brand hover:text-brand-strong active:scale-95 disabled:opacity-35 disabled:hover:border-line disabled:hover:text-ink"
                          >
                            <Plus className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p
                      className={`mt-2 hidden text-sm font-extrabold transition sm:block ${
                        on ? "text-ink" : "text-transparent"
                      }`}
                      aria-hidden={!on}
                    >
                      {on
                        ? `Промежуточный итог: ${st.qty} шт. = ${formatPrice(
                            s.price * st.qty
                          )}`
                        : "—"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="relative mt-8 overflow-hidden rounded-[28px] bg-ink p-6 sm:p-8">
        <div className="dots-light absolute inset-0 opacity-50" aria-hidden="true" />
        <div
          className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-brand/25 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-400">
                Предварительный итог
              </p>
              <p
                aria-live="polite"
                className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
              >
                {selected.length ? formatPrice(total) : "0 ₽"}
              </p>
              <p className="mt-3 flex max-w-md items-start gap-2 text-sm leading-relaxed text-slate-400">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {selected.length
                  ? "Это ориентировочная сумма «от». Точную цену мастер зафиксирует после бесплатного замера — и она не изменится."
                  : "Отметьте галочками нужные услуги — итог посчитается мгновенно. Можно выбрать несколько позиций сразу."}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                openLead({
                  title: "Заявка на расчёт",
                  subtitle:
                    "Перезвоним, уточним детали и договоримся о бесплатном замере в удобное время.",
                  message: buildMessage(),
                  source: "calculator",
                })
              }
              className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-2xl bg-brand px-7 text-base font-extrabold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-strong active:scale-[0.99]"
            >
              <Send className="h-5 w-5" />
              Оставить заявку на расчёт
            </button>
          </div>

          {selected.length > 0 && (
            <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
              {selected.map((s) => (
                <span
                  key={s.slug}
                  className="shrink-0 rounded-full bg-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 ring-1 ring-white/15"
                >
                  {s.name} × {state[s.slug].qty}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
