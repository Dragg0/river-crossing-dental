import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { posts, type BlogBlock } from "@/content/blog";
import { CtaBand } from "@/components/cta-band";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [post.heroImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const other = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="bg-brand-cream border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-brand-navy hover:text-brand-coral"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> All posts
          </Link>
        </div>
      </section>

      <article className="bg-white">
        {/* Hero */}
        <header className="bg-brand-cream py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-5">
            <div className="flex items-center gap-3 text-xs">
              <span className="font-bold tracking-widest uppercase text-brand-coral">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1 text-slate-500">
                <Calendar className="h-3 w-3" />
                {dateFormatter.format(new Date(post.publishedAt))}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-slate-700 leading-relaxed">{post.excerpt}</p>
            <div className="flex items-center gap-3 pt-2">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={56}
                height={56}
                className="h-12 w-12 rounded-full object-cover bg-brand-navy"
              />
              <div>
                <p className="font-bold text-brand-navy text-sm">{post.author.name}</p>
                <p className="text-xs text-slate-500">{post.author.title}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl -mt-4">
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={post.heroImage}
              alt={post.heroImageAlt}
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Body */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl py-12 sm:py-16">
          <div className="space-y-6">
            {post.body.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}
          </div>
        </div>
      </article>

      {/* Related */}
      {other.length > 0 && (
        <section className="bg-brand-cream py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-navy">More from the blog</h2>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center text-sm font-semibold text-brand-navy hover:text-brand-coral"
              >
                See all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {other.map((o) => (
                <Link
                  key={o.slug}
                  href={`/blog/${o.slug}`}
                  className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-xs font-bold tracking-widest uppercase text-brand-coral mb-2">
                    {o.category}
                  </span>
                  <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-coral">
                    {o.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{o.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}

function BlockRenderer({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-base sm:text-lg text-slate-700 leading-relaxed">{block.text}</p>;
    case "h2":
      return (
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy mt-8 mb-2">{block.text}</h2>
      );
    case "h3":
      return <h3 className="text-xl font-bold text-brand-navy mt-6 mb-2">{block.text}</h3>;
    case "ul":
      return (
        <ul className="space-y-2 text-slate-700">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2 leading-relaxed">
              <span className="text-brand-coral mt-1.5 flex-shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal pl-5 space-y-2 marker:text-brand-coral marker:font-bold text-slate-700">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed pl-1">
              {item}
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <aside className="my-6 rounded-2xl bg-brand-cream border-l-4 border-brand-coral p-6">
          <p className="text-base sm:text-lg italic font-medium text-brand-navy leading-relaxed">
            {block.text}
          </p>
        </aside>
      );
    case "image":
      return (
        <figure className="my-6">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-sm text-slate-500 italic text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
  }
}
