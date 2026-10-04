import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/contacts";
import { SERVICES } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const statics: MetadataRoute.Sitemap = [
    { path: "", priority: 1 },
    { path: "/uslugi", priority: 0.9 },
    { path: "/o-kompanii", priority: 0.7 },
    { path: "/kontakty", priority: 0.8 },
  ].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const services: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE_URL}/uslugi/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...statics, ...services];
}
