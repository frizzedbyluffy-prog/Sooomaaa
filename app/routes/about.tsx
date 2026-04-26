import { Link } from "react-router";
import type { Route } from "./+types/about";
import { SiteLayout } from "../components/Layout";
import { Marquee } from "../components/Marquee";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "About — ZYRAKO" },
    {
      name: "description",
      content: "ZYRAKO. Anime streetwear. The manifesto.",
    },
  ];
}

const VALUES = [
  {
    number: "01",
    jp: "無制限",
    title: "UNFILTERED",
    body: "No trend-chasing. No apologies. Designs that challenge what streetwear means in 2026.",
  },
  {
    number: "02",
    jp: "限定",
    title: "LIMITED",
    body: "Every drop is finite. No restocks. Own the moment or miss it forever.",
  },
  {
    number: "03",
    jp: "意図的",
    title: "INTENTIONAL",
    body: "Every stitch, every colorway, every kanji — a decision. Nothing is accidental.",
  },
  {
    number: "04",
    jp: "文化",
    title: "CULTURE",
    body: "Born from anime. Built for the streets. Worn by those who create — not consume.",
  },
  {
    number: "05",
    jp: "品質",
    title: "QUALITY",
    body: "400gsm cotton. Oversized silhouettes. Built to outlast the trend cycle.",
  },
  {
    number: "06",
    jp: "反乱",
    title: "REBELLION",
    body: "Brutalist design for a generation that sees through the polished and corporate.",
  },
];

export default function About(_: Route.ComponentProps) {
  return (
    <SiteLayout>
      {/* ── Manifesto Hero ────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 py-24 border-b-4 border-[#ff0000] overflow-hidden scanlines">
        {/* Background kanji watermark */}
        <div
          className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="font-jp font-black text-[28vw] text-white/[0.03] leading-none">
            反
          </span>
        </div>

        <div className="max-w-[1600px] mx-auto w-full relative z-10">
          {/* Tag */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-[#ff0000]" />
            <div>
              <p className="font-jp text-[#ff0000] text-xs font-bold tracking-[0.5em]">
                ブランドマニフェスト
              </p>
              <p className="font-body text-white/40 text-xs uppercase tracking-[0.4em]">
                BRAND MANIFESTO
              </p>
            </div>
          </div>

          {/* Opening line in Japanese */}
          <p className="font-jp font-black text-[clamp(32px,5vw,72px)] text-[#ff0000] uppercase leading-tight mb-4 tracking-wide">
            アニメ. ストリート. 文化.
          </p>

          {/* Main headline */}
          <h1 className="font-display text-[clamp(48px,9vw,140px)] text-white uppercase leading-none mb-10 max-w-6xl">
            WE DON'T FOLLOW
            <br />
            THE CULTURE.
            <br />
            <span className="text-[#ff0000]">WE ARE</span> THE CULTURE.
          </h1>

          {/* Body */}
          <p className="font-body text-base text-white/60 max-w-2xl leading-relaxed uppercase tracking-wide">
            Zyrako is built for the generation raised on anime and born into the
            streets. Raw materials. Uncompromised design. Every drop is limited.
            Every piece is a chapter. If you know, you know.
          </p>

          {/* Japanese translation */}
          <p className="font-jp text-sm text-white/25 mt-4 max-w-xl">
            ゼイラコは、アニメで育ちストリートで生まれた世代のために作られました。妥協のないデザイン。全てのドロップは限定。あなたが知っているなら、あなたは知っている。
          </p>
        </div>
      </section>

      <Marquee />

      {/* ── Values Grid ───────────────────────────── */}
      <section className="px-6 py-24 max-w-[1600px] mx-auto">
        <div className="flex items-baseline justify-between mb-16 border-b-2 border-white pb-4">
          <div>
            <p className="font-jp text-[#ff0000] text-xs tracking-widest mb-1">私たちの信念</p>
            <h2 className="font-display text-4xl text-white uppercase tracking-wide">
              WHAT WE STAND FOR
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {VALUES.map((v, i) => (
            <div
              key={v.number}
              style={{ marginTop: i % 3 === 1 ? "2rem" : i % 3 === 2 ? "4rem" : "0" }}
              className="border-2 border-white p-8 hover:border-[#ff0000] hover:bg-[#ff0000]/5 transition-all duration-100 panel-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="font-display text-5xl text-[#ff0000]/25">
                  {v.number}
                </span>
                <span className="font-jp text-3xl font-black text-white/15">
                  {v.jp}
                </span>
              </div>
              <h3 className="font-display text-2xl text-white uppercase mb-3 tracking-wide">
                {v.title}
              </h3>
              <p className="font-body text-sm text-white/55 leading-relaxed">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Origin story ──────────────────────────── */}
      <section className="border-t-2 border-y-white px-6 py-24 bg-white/[0.02]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-white">
          <div className="p-12 border-b-2 md:border-b-0 md:border-r-2 border-white flex flex-col justify-center">
            <p className="font-jp text-[#ff0000] text-xs tracking-[0.5em] font-bold mb-4">
              ストーリー
            </p>
            <h2 className="font-display text-[clamp(32px,5vw,64px)] text-white uppercase leading-tight mb-6">
              THE ORIGIN
            </h2>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-4">
              Started as a passion project between two anime-obsessed designers
              who couldn't find clothes that represented the intersection of
              Tokyo street culture and the worlds they grew up watching.
            </p>
            <p className="font-body text-sm text-white/60 leading-relaxed">
              Every collection references a different genre. Every drop is a
              new arc. ZYRAKO is the manga that never ends.
            </p>
          </div>
          <div className="p-12 flex flex-col justify-center">
            <p className="font-jp text-2xl font-black text-white/10 leading-loose">
              ゼイラコは、東京のストリートカルチャーと二人のデザイナーが育ったアニメの世界の交差点を表す服を探していた、アニメおたくの情熱的なプロジェクトとして始まりました。
            </p>
            <div className="mt-8 border-t-2 border-white/20 pt-6">
              <p className="font-display text-xl text-white uppercase">
                FOUNDED 2024.
              </p>
              <p className="font-jp text-sm text-white/40 mt-1">
                2024年設立 — アニメとストリートの融合
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="border-t-4 border-white py-24 px-6">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <p className="font-jp text-[#ff0000] text-sm mb-3 font-bold tracking-widest">
              文化を着る
            </p>
            <h2 className="font-display text-[clamp(36px,6vw,80px)] text-white uppercase leading-tight max-w-2xl">
              READY TO WEAR THE CULTURE?
            </h2>
          </div>
          <Link
            to="/collections/all"
            className="font-display text-xl uppercase tracking-widest border-4 border-[#ff0000] text-[#ff0000] px-14 py-5 hover:bg-[#ff0000] hover:text-white transition-colors duration-75 whitespace-nowrap flex-shrink-0"
          >
            SHOP NOW →
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
