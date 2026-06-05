import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/content/services";
import { offers } from "@/content/offers";
import { posts } from "@/content/blog";

const BASE = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/meet-the-team`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/advanced-technology`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/financing-insurance`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/reviews`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/website-accessibility`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const subServicePages: MetadataRoute.Sitemap = [
    { url: `${BASE}/services/cosmetic-dentistry/icon`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/services/orthodontics/invisalign-teen`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/services/orthodontics/invisalign-first`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
  ];

  const specialsPages: MetadataRoute.Sitemap = offers.map((o) => ({
    url: `${BASE}/specials/${o.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...subServicePages,
    ...specialsPages,
    ...blogPages,
  ];
}
