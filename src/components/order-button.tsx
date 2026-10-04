"use client";

import { Send } from "lucide-react";
import { useLeadModal, type LeadPayload } from "@/components/lead-modal";

export function OrderButton({
  label = "Оставить заявку",
  payload,
  className = "",
  icon = true,
}: {
  label?: string;
  payload?: LeadPayload;
  className?: string;
  icon?: boolean;
}) {
  const { openLead } = useLeadModal();

  return (
    <button
      type="button"
      onClick={() => openLead(payload)}
      className={`inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-brand px-7 text-base font-extrabold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-strong active:scale-[0.99] ${className}`}
    >
      {icon && <Send className="h-5 w-5" />}
      {label}
    </button>
  );
}
