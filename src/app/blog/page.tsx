import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, Calendar } from "lucide-react";
import { posts } from "@/content/blog";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from Dr. Peterson on Invisalign, braces, bite problems, and the connection between your smile and your overall health.",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function BlogIndexPage() {
  const sorted = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <>
      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-5">
          <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">Blog</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy">
            Notes from the chair.
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Practical insight from Dr. Peterson on Invisalign, braces, bite problems, and the
            connection between your smile and your overall health.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sorted.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group flex flex-col overflow-hidden rounded-2xl bg-brand-cream shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    i === 0 ? "aspect-[16/8]" : "aspect-[16/9]"
                  }`}
                >
                  <Image
                    src={post.heroImage}
                    alt={post.heroImageAlt}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 1000px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6 lg:p-8 space-y-3">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-bold tracking-widest uppercase text-brand-coral">
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-500">
                      <Calendar className="h-3 w-3" />
                      {dateFormatter.format(new Date(post.publishedAt))}
                    </span>
                  </div>
                  <h2 className={`font-bold text-brand-navy ${i === 0 ? "text-2xl lg:text-3xl" : "text-xl"}`}>
                    {post.title}
                  </h2>
                  <p className="text-slate-700 leading-relaxed">{post.excerpt}</p>
                  <span className="mt-auto inline-flex items-center pt-2 text-sm font-semibold text-brand-coral group-hover:text-brand-coral-dark">
                    Read post
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
