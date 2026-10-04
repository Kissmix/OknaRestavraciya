import { Phone } from "lucide-react";
import { CONTACTS } from "@/lib/contacts";
import { MaxIcon, TelegramIcon, WhatsAppIcon } from "@/components/brand-icons";

const ITEMS = [
  {
    href: CONTACTS.phoneHref,
    label: `Позвонить: ${CONTACTS.phoneDisplay}`,
    Icon: Phone,
    cls: "bg-brand pulse-soft",
    external: false,
  },
  {
    href: CONTACTS.max,
    label: "Написать в MAX",
    Icon: MaxIcon,
    cls: "bg-max",
    external: true,
  },
  {
    href: CONTACTS.whatsapp,
    label: "Написать в WhatsApp",
    Icon: WhatsAppIcon,
    cls: "bg-wa",
    external: true,
  },
  {
    href: CONTACTS.telegram,
    label: "Написать в Telegram",
    Icon: TelegramIcon,
    cls: "bg-tg",
    external: true,
  },
];

export function FloatingContacts() {
  return (
    <nav
      aria-label="Быстрые способы связи"
      className="fixed bottom-4 right-3.5 z-40 sm:bottom-6 sm:right-6"
    >
      <div className="flex flex-col gap-1.5 rounded-full bg-white/85 p-1.5 shadow-xl shadow-ink/15 ring-1 ring-ink/8 backdrop-blur-md">
        {ITEMS.map(({ href, label, Icon, cls, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={`grid h-11 w-11 place-items-center rounded-full text-white transition hover:scale-105 active:scale-95 sm:h-[52px] sm:w-[52px] ${cls}`}
          >
            <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
          </a>
        ))}
      </div>
    </nav>
  );
}
