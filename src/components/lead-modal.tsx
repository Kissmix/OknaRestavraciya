"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { CheckCircle2, Loader2, Phone, Send, X } from "lucide-react";
import { CONTACTS } from "@/lib/contacts";
import { MaxIcon, TelegramIcon, WhatsAppIcon } from "@/components/brand-icons";

export interface LeadPayload {
  title?: string;
  subtitle?: string;
  service?: string;
  message?: string;
  source?: string;
}

interface LeadModalContextValue {
  openLead: (payload?: LeadPayload) => void;
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function useLeadModal(): LeadModalContextValue {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal must be used within LeadModalProvider");
  }
  return ctx;
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [payload, setPayload] = useState<LeadPayload | null>(null);

  const openLead = useCallback((p?: LeadPayload) => setPayload(p ?? {}), []);
  const close = useCallback(() => setPayload(null), []);

  useEffect(() => {
    if (payload === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [payload, close]);

  return (
    <LeadModalContext.Provider value={{ openLead }}>
      {children}
      {payload !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Форма заявки"
        >
          <button
            type="button"
            aria-label="Закрыть форму"
            onClick={close}
            className="fade-in absolute inset-0 cursor-default bg-ink/55 backdrop-blur-[2px]"
          />
          <div className="sheet-in relative max-h-[92dvh] w-full overflow-y-auto rounded-t-[28px] bg-white p-6 pb-9 shadow-2xl sm:max-w-md sm:rounded-[28px] sm:p-8">
            <button
              type="button"
              onClick={close}
              aria-label="Закрыть"
              className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full text-ink-soft transition hover:bg-paper hover:text-ink"
            >
              <X className="h-6 w-6" />
            </button>
            <LeadForm payload={payload} onDone={close} />
          </div>
        </div>
      )}
    </LeadModalContext.Provider>
  );
}

export function LeadForm({
  payload,
  onDone,
  showMessage = false,
}: {
  payload?: LeadPayload;
  onDone?: () => void;
  showMessage?: boolean;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(payload?.message ?? "");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setMessage(payload?.message ?? "");
    setStatus("idle");
    setErrorText("");
  }, [payload]);

  const title = payload?.title ?? "Оставить заявку";
  const subtitle =
    payload?.subtitle ??
    "Перезвоним в течение 15 минут, ответим на вопросы и договоримся о бесплатном замере.";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setStatus("error");
      setErrorText("Введите корректный номер телефона — не менее 10 цифр.");
      return;
    }
    setStatus("loading");
    setErrorText("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          message,
          service: payload?.service,
          source: payload?.source ?? "site",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorText(
        `Не получилось отправить заявку. Пожалуйста, позвоните нам: ${CONTACTS.phoneDisplay}`
      );
    }
  }

  if (status === "success") {
    return (
      <div className="fade-in text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-soft text-brand">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-ink">
          Заявка отправлена!
        </h3>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Спасибо! Перезвоним в течение 15 минут в рабочее время
          (ежедневно с 8:00 до 21:00). Если удобнее — напишите нам
          в мессенджер:
        </p>
        <div className="mt-6 grid grid-cols-3 gap-2.5">
          <a
            href={CONTACTS.max}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 flex-col items-center justify-center gap-0.5 rounded-2xl bg-max text-white transition hover:brightness-110 active:scale-[0.98]"
          >
            <MaxIcon className="h-5 w-5" />
            <span className="text-[11px] font-bold">MAX</span>
          </a>
          <a
            href={CONTACTS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 flex-col items-center justify-center gap-0.5 rounded-2xl bg-wa text-white transition hover:brightness-105 active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span className="text-[11px] font-bold">WhatsApp</span>
          </a>
          <a
            href={CONTACTS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 flex-col items-center justify-center gap-0.5 rounded-2xl bg-tg text-white transition hover:brightness-110 active:scale-[0.98]"
          >
            <TelegramIcon className="h-5 w-5" />
            <span className="text-[11px] font-bold">Telegram</span>
          </a>
        </div>
        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="mt-4 h-14 w-full rounded-2xl border border-line bg-white font-bold text-ink transition hover:bg-paper active:scale-[0.99]"
          >
            Закрыть
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="block">
      <h3 className="pr-12 text-2xl font-extrabold tracking-tight text-ink">
        {title}
      </h3>
      <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">
        {subtitle}
      </p>
      {payload?.service && (
        <p className="mt-4 rounded-2xl bg-brand-soft px-4 py-3 text-sm font-bold text-brand-strong">
          {payload.service}
        </p>
      )}

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold text-ink">
            Ваше имя
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
            autoComplete="name"
            className="min-h-[52px] w-full rounded-2xl border border-line bg-paper px-4 text-base text-ink placeholder:text-ink-faint transition focus:border-brand focus:bg-white"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold text-ink">
            Телефон <span className="text-brand">*</span>
          </span>
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 ___ ___-__-__"
            autoComplete="tel"
            required
            className="min-h-[52px] w-full rounded-2xl border border-line bg-paper px-4 text-base text-ink placeholder:text-ink-faint transition focus:border-brand focus:bg-white"
          />
        </label>
        {showMessage && (
          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-ink">
              Комментарий
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Например: два двустворчатых окна, дует по нижнему контуру"
              rows={3}
              className="w-full rounded-2xl border border-line bg-paper px-4 py-3.5 text-base text-ink placeholder:text-ink-faint transition focus:border-brand focus:bg-white"
            />
          </label>
        )}
      </div>

      {status === "error" && errorText && (
        <p
          role="alert"
          className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
        >
          {errorText}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand text-base font-extrabold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-strong active:scale-[0.99] disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Отправляем…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Отправить заявку
          </>
        )}
      </button>

      <p className="mt-3.5 text-center text-xs leading-relaxed text-ink-faint">
        Нажимая «Отправить заявку», вы соглашаетесь на обработку персональных
        данных. Никакого спама — только один звонок по делу.
      </p>

      <a
        href={CONTACTS.phoneHref}
        className="mt-4 flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-line bg-white font-bold text-ink transition hover:border-brand hover:text-brand-strong active:scale-[0.99]"
      >
        <Phone className="h-5 w-5" />
        {CONTACTS.phoneDisplay}
      </a>
    </form>
  );
}
