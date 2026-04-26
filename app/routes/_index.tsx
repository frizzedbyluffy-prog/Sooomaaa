import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/_index";
import { SiteLayout } from "../components/Layout";
import { Marquee } from "../components/Marquee";
import { ProductCard } from "../components/ProductCard";
import { MOCK_PRODUCTS } from "../lib/mockData";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "ZYRAKO — Anime Streetwear" },
    { name: "description", content: "ZYRAKO. Anime streetwear. Wear the culture." },
  ];
}

export async function clientLoader(_: Route.ClientLoaderArgs) {
  return { products: MOCK_PRODUCTS.slice(0, 3) };
}

// ── Animated headline ──────────────────────────
function AnimatedTitle({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span key={i} className="letter">
          <span style={{ animationDelay: `${0.04 * i + 0.2}s` }}>
            {char === " " ? " " : char}
          </span>
        </span>
      ))}
    </span>
  );
}

// ── HUD stat ──────────────────────────────────
function HudStat({ label, value, jp }: { label: string; value: string; jp: string }) {
  return (
    <div className="border-l-2 border-[#ff0000] pl-3">
      <p className="font-jp text-[#ff0000] text-[9px] tracking-[0.3em] mb-0.5">{jp}</p>
      <p className="font-display text-white text-lg leading-none">{value}</p>
      <p className="font-body text-white/30 text-[9px] uppercase tracking-widest mt-0.5">{label}</p>
    </div>
  );
}

// ── Scroll reveal hook ─────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [counter, setCounter] = useState(0);
  useReveal();

  useEffect(() => {
    const t = setInterval(() => setCounter((c) => (c >= 26 ? 0 : c + 1)), 80);
    return () => clearInterval(t);
  }, []);

  return (
    <SiteLayout>

      {/* ═══════════════════════════════════════════
          HERO — full viewport video
      ════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[700px] overflow-hidden scanlines noise">

        {/* VIDEO — replace src with your own video URL */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
          /* ↓ Replace with your actual video URL */
          src="/hero.mp4"
        />

        {/* CSS fallback shown until/if video loads */}
        <div
          className={`absolute inset-0 hero-bg speed-lines transition-opacity duration-1000 ${videoLoaded ? "opacity-0" : "opacity-100"}`}
        />

        {/* Dark gradient overlay */}
        <div className="video-overlay absolute inset-0 z-10" />

        {/* Red accent line top */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#ff0000] z-20 line-in" />

        {/* HUD top-left */}
        <div className="absolute top-8 left-6 z-20 flex items-center gap-3">
          <div className="w-2 h-2 bg-[#ff0000] border-pulse" />
          <span className="font-jp text-[#ff0000] text-[10px] tracking-[0.4em] font-bold">
            ゼイラコ / SS26
          </span>
          <span className="blink font-jp text-[#ff0000] text-[10px]">■</span>
        </div>

        {/* HUD top-right counter */}
        <div className="absolute top-8 right-6 z-20 text-right">
          <p className="font-display text-white/20 text-4xl leading-none">
            {String(counter).padStart(2, "0")}
          </p>
          <p className="font-jp text-white/30 text-[9px] tracking-widest">/ 26</p>
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-20 h-full flex flex-col justify-end px-6 pb-16 max-w-[1600px] mx-auto">

          {/* Season */}
          <div className="flex items-center gap-4 mb-6 overflow-hidden">
            <div className="h-[2px] w-12 bg-[#ff0000] line-in" />
            <span
              className="font-jp text-[#ff0000] text-xs tracking-[0.6em] font-bold"
              style={{ animation: "letterIn 0.6s 0.1s cubic-bezier(0.16,1,0.3,1) forwards", opacity: 0, display: "inline-block" }}
            >
              新着コレクション — SS26
            </span>
          </div>

          {/* Main title */}
          <h1 className="font-display uppercase leading-none mb-6 overflow-hidden">
            <AnimatedTitle
              text="ZYRAKO"
              className="block text-[clamp(72px,15vw,220px)] text-white tracking-tight"
            />
          </h1>

          {/* Japanese subtitle */}
          <p
            className="font-jp font-black text-[clamp(20px,4vw,56px)] text-[#ff0000] tracking-wide mb-8 leading-tight"
            style={{ animation: "letterIn 0.8s 0.6s cubic-bezier(0.16,1,0.3,1) forwards", opacity: 0, display: "block" }}
          >
            アニメ · ストリート · 文化
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 mb-12"
            style={{ animation: "letterIn 0.6s 0.9s cubic-bezier(0.16,1,0.3,1) forwards", opacity: 0 }}
          >
            <Link
              to="/collections/all"
              className="group relative font-display text-xl uppercase tracking-widest bg-[#ff0000] text-white border-4 border-[#ff0000] px-12 py-4 overflow-hidden hover:text-[#ff0000] transition-colors duration-200"
            >
              <span className="relative z-10">SHOP NOW</span>
              <span className="absolute inset-0 bg-[#0a0a0a] translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out" />
            </Link>
            <Link
              to="/about"
              className="font-display text-xl uppercase tracking-widest border-4 border-white/50 text-white px-12 py-4 hover:border-[#ff0000] hover:text-[#ff0000] transition-colors duration-150"
            >
              MANIFESTO
            </Link>
          </div>

          {/* Bottom HUD strip */}
          <div className="flex items-end justify-between border-t border-white/10 pt-4">
            <div className="flex gap-8">
              <HudStat label="Collection" value="SS26" jp="コレクション" />
              <HudStat label="Drops" value="06" jp="ドロップ" />
              <HudStat label="Limited" value="限定" jp="エディション" />
            </div>
            <div className="hidden md:flex items-center gap-2 text-white/30">
              <span className="font-body text-xs uppercase tracking-widest">Scroll</span>
              <div className="flex flex-col gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-4 h-[1px] bg-white/20" style={{ opacity: 1 - i * 0.2 }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vertical side text */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3">
          <div className="h-16 w-[1px] bg-white/20" />
          <p
            className="font-jp text-white/20 text-[10px] tracking-[0.4em]"
            style={{ writingMode: "vertical-rl" }}
          >
            文化を着る
          </p>
          <div className="h-16 w-[1px] bg-white/20" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MARQUEE
      ════════════════════════════════════════════ */}
      <Marquee />

      {/* ═══════════════════════════════════════════
          FEATURED DROPS
      ════════════════════════════════════════════ */}
      <section className="py-28 px-6 max-w-[1600px] mx-auto">
        <div className="reveal flex items-end justify-between mb-16">
          <div>
            <p className="font-jp text-[#ff0000] text-xs tracking-[0.5em] font-bold mb-2">注目のドロップ</p>
            <h2 className="font-display text-[clamp(36px,6vw,88px)] uppercase text-white leading-none">
              FEATURED
              <br />
              <span className="text-[#ff0000]">DROPS</span>
            </h2>
          </div>
          <Link
            to="/collections/all"
            className="hidden md:flex items-center gap-3 font-body text-sm uppercase tracking-widest text-white/50 hover:text-[#ff0000] transition-colors duration-75 group"
          >
            VIEW ALL
            <span className="inline-block w-8 h-[2px] bg-white/30 group-hover:bg-[#ff0000] group-hover:w-12 transition-all duration-200" />
          </Link>
        </div>

        {/* Manga panel grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l-2 border-t-2 border-white/20 reveal">
          {products.map((product) => (
            <div key={product.id} className="border-r-2 border-b-2 border-white/20">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FULL BLEED STATEMENT
      ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#ff0000] py-24 px-6 reveal">
        {/* Speed lines bg */}
        <div className="absolute inset-0 speed-lines opacity-30" />
        {/* Big watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none select-none">
          <span className="font-jp font-black text-[25vw] text-[#0a0a0a]/10 leading-none whitespace-nowrap">
            文化
          </span>
        </div>
        <div className="relative z-10 max-w-[1600px] mx-auto">
          <p className="font-jp text-[#0a0a0a]/60 text-sm tracking-[0.5em] font-bold mb-4">
            ブランドマニフェスト
          </p>
          <p className="font-display text-[clamp(40px,7vw,110px)] text-[#0a0a0a] uppercase leading-tight mb-10 max-w-5xl">
            NOT A BRAND.
            <br />
            A STATEMENT.
          </p>
          <Link
            to="/about"
            className="group inline-flex items-center gap-4 font-display text-xl uppercase tracking-widest border-4 border-[#0a0a0a] text-[#0a0a0a] px-12 py-4 hover:bg-[#0a0a0a] hover:text-[#ff0000] transition-colors duration-150"
          >
            READ THE MANIFESTO
            <span className="inline-block w-0 overflow-hidden group-hover:w-6 transition-all duration-200">→</span>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CULTURE STATS
      ════════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-white/10 reveal">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-white/10">
          {[
            { jp: "限定", en: "LIMITED DROPS", sub: "No restocks. Own it or miss it forever." },
            { jp: "本物", en: "AUTHENTIC", sub: "Zero trend-chasing. Ever.", border: true },
            { jp: "文化", en: "CULTURE FIRST", sub: "Worn by those who build it." },
          ].map((item, i) => (
            <div
              key={i}
              className={`group p-10 text-center hover:bg-[#ff0000]/5 transition-colors duration-200 cursor-none ${i === 1 ? "border-x border-white/10" : ""}`}
            >
              <p className="font-jp text-5xl font-black text-[#ff0000] mb-3 group-hover:scale-110 transition-transform duration-200 inline-block">
                {item.jp}
              </p>
              <p className="font-display text-xl text-white uppercase tracking-widest mb-2">
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
