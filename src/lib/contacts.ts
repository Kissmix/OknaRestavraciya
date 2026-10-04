export const SITE_NAME = "ОкноСервис";
export const SITE_TAGLINE = "Реставрация и утепление окон";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const CONTACTS = {
  phoneDisplay: "+7 933 170 82 07",
  phoneHref: "tel:+79331708207",
  email: "alega783@mail.ru",
  emailHref: "mailto:alega783@mail.ru",
  max: "https://max.ru/u/f9LHodD0cOJQNo-WPlNGS8BIea52Sdfukw3g6Eg6jGJqIF93GyyTyT2XVgo",
  whatsapp: "https://wa.me/+79099141301",
  telegram: "https://t.me/OlegVasilevic2026",
  hours: "Ежедневно с 8:00 до 21:00",
} as const;

export const NAV = [
  { href: "/", label: "Главная" },
  { href: "/uslugi", label: "Услуги и цены" },
  { href: "/o-kompanii", label: "О компании" },
  { href: "/kontakty", label: "Контакты" },
] as const;
