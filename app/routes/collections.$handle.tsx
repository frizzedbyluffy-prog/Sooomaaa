import { Link, useSearchParams } from "react-router";
import type { Route } from "./+types/collections.$handle";
import { SiteLayout } from "../components/Layout";
import { ProductCard } from "../components/ProductCard";
import { Marquee } from "../components/Marquee";
import { MOCK_COLLECTION } from "../lib/mockData";

export function meta({ params }: Route.MetaArgs) {
  const handle = params.handle?.toUpperCase().replace(/-/g, " ") ?? "COLLECTION";
  return [
    { title: `${handle} — ZYRAKO` },
    { name: "description", content: `Shop the ${handle} collection at ZYRAKO.` },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const handle = params.handle ?? "all";
  const collection = {
    ...MOCK_COLLECTION,
    handle,
    title: handle === "all" ? "ALL DROPS" : handle.toUpperCase().replace(/-/g, " "),
  };
  return { collection };
}

const SORT_OPTIONS = [
  { key: "RELEVANCE", label: "FEATURED", jp: "おすすめ" },
  { key: "PRICE_ASC", label: "PRICE ↑", jp: "安い順" },
  { key: "PRICE_DESC", label: "PRICE ↓", jp: "高い順" },
  { key: "CREATED_AT", label: "NEWEST", jp: "新着順" },
];

export default function CollectionPage({ loaderData }: Route.ComponentProps) {
  const { collection } = loaderData;
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get("sort") ?? "RELEVANCE";

  const products = collection.products.nodes;
  const pageInfo = collection.products.pageInfo;

  return (
    <SiteLayout>
      {/* Collection header */}
      <div className="border-b-4 border-white px-6 py-16 max-w-[1600px] mx-auto">
        <p className="font-jp text-[#ff0000] text-xs tracking-[0.5em] font-bold border-l-4 border-[#ff0000] pl-4 mb-4">
          コレクション
        </p>
        <h1
          className="font-display text-[clamp(48px,9vw,130px)] text-white uppercase leading-none glitch"
          data-text={collection.title}
        >
          {collection.title}
        </h1>
        {collection.description && (
          <p className="font-body text-sm text-white/50 uppercase tracking-widest mt-4 max-w-lg">
            {collection.description}
          </p>
        )}
      </div>

      {/* Sort bar */}
      <div className="border-b-2 border-white/30 px-6 py-4 max-w-[1600px] mx-auto flex flex-wrap items-center gap-3">
        <span className="font-jp text-xs text-white/40 tracking-widest mr-2">
          並び替え:
        </span>
        {SORT_OPTIONS.map(({ key, label }) => (
          <Link
            key={key}
            to={`?sort=${key}`}
            className={`font-body text-xs uppercase tracking-widest px-3 py-1.5 border-2 transition-colors duration-75 ${
              currentSort === key
                ? "border-[#ff0000] text-[#ff0000]"
                : "border-white/30 text-white/50 hover:border-white hover:text-white"
            }`}
          >
            {label}
          </Link>
        ))}
        <span className="ml-auto font-body text-xs text-white/30 uppercase tracking-widest">
          {products.length} ITEMS
        </span>
      </div>

      {/* Product grid */}
      <div className="px-6 py-12 max-w-[1600px] mx-auto">
        {products.length === 0 ? (
          <div className="text-center py-32">
            <p className="font-jp text-6xl font-black text-white/10 mb-4">空</p>
            <p className="font-display text-3xl text-white/20 uppercase">
              NO DROPS YET
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 border-l-2 border-t-2 border-white">
            {products.map((product) => (
              <div
                key={product.id}
                className="border-r-2 border-b-2 border-white"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Load more */}
        {pageInfo.hasNextPage && (
          <div className="mt-16 flex justify-center">
            <Link
              to={`?cursor=${pageInfo.endCursor}&sort=${currentSort}`}
              className="font-display text-xl uppercase tracking-widest border-4 border-white text-white px-16 py-5 hover:bg-[#ff0000] hover:border-[#ff0000] transition-colors duration-75"
            >
              LOAD MORE
            </Link>
          </div>
        )}
      </div>

      <Marquee />
    </SiteLayout>
  );
}
