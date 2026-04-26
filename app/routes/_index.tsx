import { Link } from "react-router";
import type { Route } from "./+types/_index";
import { SiteLayout } from "../components/Layout";
import { Marquee } from "../components/Marquee";
import { ProductCard } from "../components/ProductCard";
import { MOCK_PRODUCTS } from "../lib/mockData";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "ZYRAKO — Anime Streetwear" },
    {
      name: "description",
      content: "ZYRAKO. Anime streetwear for those who wear the culture.",
    },
  ];
}

export async function loader(_: Route.LoaderArgs) {
  return { products: MOCK_PRODUCTS.slice(0, 3) };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  return (
    <SiteLayout>
      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden border-b-4 border-white scanlines">
        {/* Katakana watermark */}
        <div
          className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="font-jp font-black text-[22vw] text-white/[0.04] leading-none whitespace-nowrap translate-x-[-5%]">
            ゼイラコ
          </span>
        </div>

        {/* Red scanline overlay handled by .scanlines CSS class */}

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/0 via-[#0a0a0a]/20 to-[#0a0a0a] pointer-events-none" />

        {/* Foreground content */}
        <div className="relative z-10 px-6 pb-20 max-w-[1600px] mx-auto w-full">
          {/* Season tag */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-[#ff0000]" />
            <div>
              <p className="font-jp text-[#ff0000] text-xs tracking-[0.4em] font-bold">
                新着コレクション
              </p>
              <p className="font-body text-white/50 text-xs uppercase tracking-[0.4em]">
                SS26 COLLECTION
              </p>
            </div>
          </div>

          {/* Main headline */}
          <h1
            className="font-display text-[clamp(64px,13vw,200px)] leading-none uppercase text-white glitch mb-4"
            data-text="ZYRAKO"
          >
            ZYRAKO
          </h1>

          {/* Tagline */}
          <p className="font-body text-sm text-white/50 uppercase tracking-[0.3em] mb-10 max-w-sm">
            ANIME. STREET. CULTURE. — 文化を着る
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/collections/all"
              className="font-display text-lg uppercase tracking-widest bg-[#ff0000] text-white border-4 border-[#ff0000] px-10 py-4 hover:bg-[#0a0a0a] hover:text-[#ff0000] transition-colors duration-75"
            >
              SHOP NOW
            </Link>
            <Link
              to="/about"
              className="font-display text-lg uppercase tracking-widest border-4 border-white text-white px-10 py-4 hover:border-[#ff0000] hover:text-[#ff0000] transition-colors duration-75"
            >
              OUR STORY
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 border-2 border-white/30 px-3 py-1.5 z-10">
          <span className="font-jp text-xs text-white/30 tracking-widest">
            スクロール
          </span>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────── */}
      <Marquee />

      {/* ── Featured Drops ────────────────────────── */}
      <section className="py-24 px-6 max-w-[1600px] mx-auto">
        <div className="flex items-baseline justify-between mb-12 border-b-2 border-white pb-4">
          <div>
            <p className="font-jp text-[#ff0000] text-xs tracking-widest mb-1">
              注目のドロップ
            </p>
            <h2 className="font-display text-4xl uppercase text-white tracking-wide">
              FEATURED DROPS
            </h2>
          </div>
          <Link
            to="/collections/all"
            className="font-body text-sm uppercase tracking-widest text-white/50 hover:text-[#ff0000] transition-colors duration-75 acid-hover border-b-2 border-transparent"
          >
            VIEW ALL →
          </Link>
        </div>

        {/* Manga panel grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l-2 border-t-2 border-white">
          {products.map((product) => (
            <div key={product.id} className="border-r-2 border-b-2 border-white">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Manifesto teaser ──────────────────────── */}
      <section className="relative border-t-4 border-[#ff0000] bg-[#ff0000] py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="font-jp font-black text-[20vw] text-[#0a0a0a]/10 leading-none">
            文化
          </span>
        </div>
        <div className="max-w-[1600px] mx-auto relative z-10">
          <p className="font-jp text-[#0a0a0a]/70 text-sm tracking-widest mb-4 font-bold">
            ブランドマニフェスト
          </p>
          <p className="font-display text-[clamp(36px,6vw,100px)] text-[#0a0a0a] uppercase leading-tight mb-10 max-w-4xl">
            NOT A BRAND.
            <br />
            A STATEMENT.
          </p>
          <Link
            to="/about"
            className="font-display text-xl uppercase tracking-widest border-4 border-[#0a0a0a] text-[#0a0a0a] px-12 py-4 hover:bg-[#0a0a0a] hover:text-[#ff0000] transition-colors duration-75 inline-block"
          >
            READ THE MANIFESTO
          </Link>
        </div>
      </section>

      {/* ── Culture strip ─────────────────────────── */}
      <section className="border-t-2 border-white py-16 px-6">
        <div className="max-w-[1600px] mx-auto grid grid-cols-3 gap-0 border-2 border-white">
          {[
            { jp: "限定", en: "LIMITED DROPS", sub: "No restocks. Own it or miss it." },
            { jp: "本物", en: "AUTHENTIC", sub: "No trend chasing. Ever." },
            { jp: "文化", en: "CULTURE", sub: "Worn by those who build it." },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-8 text-center ${i < 2 ? "border-r-2 border-white" : ""}`}
            >
              <p className="font-jp text-4xl font-black text-[#ff0000] mb-2">
                {item.jp}
              </p>
              <p className="font-display text-lg text-white uppercase tracking-widest mb-1">
                {item.en}
              </p>
              <p className="font-body text-xs text-white/40 uppercase tracking-wide">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
