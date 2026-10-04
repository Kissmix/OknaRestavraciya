import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
      <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-brand-strong">
        Ошибка 404
      </p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
        Такой страницы нет — но окна чиним исправно
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
        Возможно, ссылка устарела. Загляните на главную или сразу посмотрите
        наши услуги и цены.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-brand px-7 text-base font-extrabold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-strong active:scale-[0.99]"
        >
          <ArrowLeft className="h-5 w-5" />
          На главную
        </Link>
        <Link
          href="/uslugi"
          className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-line bg-white px-7 text-base font-extrabold text-ink transition hover:border-brand hover:text-brand-strong active:scale-[0.99]"
        >
          Услуги и цены
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
