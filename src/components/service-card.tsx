import Link from "next/link";
import {
  ArrowRight,
  DoorOpen,
  Paintbrush,
  PaintRoller,
  ShieldCheck,
  ThermometerSun,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { SERVICE_GROUPS, priceFrom, type Service } from "@/lib/services";

const ICONS: Record<string, LucideIcon> = {
  paintbrush: Paintbrush,
  paintroller: PaintRoller,
  door: DoorOpen,
  wind: Wind,
  thermometer: ThermometerSun,
  shield: ShieldCheck,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = ICONS[service.icon] ?? Paintbrush;
  const group = SERVICE_GROUPS.find((g) => g.id === service.group);

  return (
    <Link
      href={`/uslugi/${service.slug}`}
      className="group flex h-full min-h-[240px] flex-col rounded-3xl border border-line bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl hover:shadow-ink/8 sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand-strong transition duration-300 group-hover:bg-brand group-hover:text-white">
          <Icon className="h-6 w-6" />
        </span>
        <span className="rounded-full bg-paper px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-ink-soft ring-1 ring-line">
          {group?.shortTitle}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-extrabold leading-snug tracking-tight text-ink transition group-hover:text-brand-strong">
        {service.name}
      </h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
        {service.shortDesc}
      </p>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
        <p className="leading-none">
          <span className="block text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-faint">
            Цена
          </span>
          <span className="mt-1.5 block text-xl font-extrabold tracking-tight text-brand-strong">
            {priceFrom(service.price)}
          </span>
        </p>
        <span className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-brand-soft px-4 text-sm font-extrabold text-brand-strong transition group-hover:bg-brand group-hover:text-white">
          Подробнее
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
