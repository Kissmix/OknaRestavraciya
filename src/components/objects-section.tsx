import Image from "next/image";
import { Building2, Home, Landmark, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import Reveal from "@/components/reveal";

interface ObjectCard {
  title: string;
  desc: string;
  img: string;
  alt: string;
  Icon: LucideIcon;
}

const OBJECTS: ObjectCard[] = [
  {
    title: "Квартиры",
    desc: "Студии, однушки и просторные многокомнатные, новостройки и старый фонд. Аккуратно работаем в жилых помещениях: всё укрываем плёнкой и убираем за собой.",
    img: "/images/kvartiry.jpg",
    alt: "Реставрация и утепление окон в квартире — светлая комната с белым деревянным окном",
    Icon: Building2,
  },
  {
    title: "Частные дома",
    desc: "Коттеджи, дачи, таунхаусы и деревянные дома. Бережно сохраняем характер и внешний вид окон, возвращая им тепло и надёжность.",
    img: "/images/doma.jpg",
    alt: "Реставрация деревянных окон в частном доме — загородный дом с белыми окнами",
    Icon: Home,
  },
  {
    title: "Здания",
    desc: "Многоквартирные, административные, коммерческие и исторические здания. Работаем по договору, с документами, графиком и гарантией.",
    img: "/images/zdaniya.jpg",
    alt: "Реставрация и утепление окон в здании — исторический фасад с белыми деревянными окнами",
    Icon: Landmark,
  },
];

export function ObjectsSection({
  eyebrow = "Для кого мы работаем",
  title = "Одинаково бережно — в квартире, доме и большом здании",
  desc = "Не делим объекты на «свои» и «чужие»: везде нужны тепло, тишина и аккуратность. Просто под каждый формат подбираем режим работы и материалы.",
}: {
  eyebrow?: string;
  title?: string;
  desc?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <SectionHeading eyebrow={eyebrow} title={title} desc={desc} />
      <div className="mt-9 grid gap-5 sm:mt-11 sm:gap-6 md:grid-cols-3">
        {OBJECTS.map((o, i) => (
          <Reveal key={o.title} delay={i * 120}>
            <article className="group relative h-80 overflow-hidden rounded-[28px] bg-ink sm:h-[380px]">
              <Image
                src={o.img}
                alt={o.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/10"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/40">
                  <o.Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-white">
                  {o.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {o.desc}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
