import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useCart } from "@shopify/hydrogen-react";
import type { Route } from "./+types/products.$handle";
import { SiteLayout } from "../components/Layout";
import { MOCK_PRODUCT_DETAIL, MOCK_PRODUCTS } from "../lib/mockData";

export function meta({ data }: Route.MetaArgs) {
  const title = (data as any)?.product?.title ?? "Product";
  return [
    { title: `${title} — ZYRAKO` },
    { name: "description", content: `${title} by ZYRAKO.` },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const handle = params.handle;
  const found = MOCK_PRODUCTS.find((p) => p.handle === handle);
  if (!found) {
    return { product: MOCK_PRODUCT_DETAIL };
  }
  return { product: MOCK_PRODUCT_DETAIL };
}

function formatMoney(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

function ProductAccordion({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t-2 border-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 font-body text-sm uppercase tracking-widest text-white hover:text-[#ff0000] transition-colors duration-75"
      >
        <span>{title}</span>
        <span className="text-2xl leading-none font-display">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="border-t-2 border-white/20 pt-4 pb-6">
          <p className="font-body text-sm text-white/60 leading-relaxed">
            {content}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ProductPage({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData as any;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { linesAdd } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const selectedOptions: Record<string, string> = {};
  product.options?.forEach((opt: any) => {
    const fromUrl = searchParams.get(opt.name);
    selectedOptions[opt.name] =
      fromUrl ?? opt.optionValues?.[0]?.name ?? "";
  });

  const selectedVariant = product.variants?.nodes?.find((v: any) =>
    v.selectedOptions?.every(
      (o: any) => selectedOptions[o.name] === o.value
    )
  ) ?? product.variants?.nodes?.[0];

  function handleOptionSelect(name: string, value: string) {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    navigate(`?${params.toString()}`, { replace: true });
  }

  async function handleAddToCart() {
    if (!selectedVariant?.id || !selectedVariant?.availableForSale) return;
    setAdding(true);
    try {
      await linesAdd([{ merchandiseId: selectedVariant.id, quantity: 1 }]);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } finally {
      setAdding(false);
    }
  }

  const images = product.images?.nodes ?? [];
  const currentImage = images[activeImage] ?? product.featuredImage;

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="px-6 py-4 border-b-2 border-white/20 max-w-[1600px] mx-auto">
        <p className="font-body text-xs text-white/40 uppercase tracking-widest">
          <Link to="/collections/all" className="hover:text-[#ff0000] transition-colors duration-75">
            SHOP
          </Link>
          {" · "}
          <span className="text-white/60">{product.title}</span>
        </p>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-white">
          {/* ── LEFT: Images ──────────────────── */}
          <div className="border-b-2 md:border-b-0 md:border-r-2 border-white">
            {/* Main image */}
            <div className="aspect-[3/4] overflow-hidden">
              {currentImage ? (
                <img
                  src={currentImage.url}
                  alt={currentImage.altText ?? product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                  <span className="font-jp text-white/10 text-8xl font-black">冬</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex border-t-2 border-white">
                {images.map((img: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-1 aspect-square overflow-hidden border-r-2 border-white last:border-r-0 transition-opacity duration-75 ${
                      activeImage === i ? "opacity-100 outline-2 outline-[#ff0000]" : "opacity-50 hover:opacity-75"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.altText ?? ""}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Product info ───────────── */}
          <div className="p-8 flex flex-col gap-6">
            {/* Vendor + title */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <p className="font-jp text-[#ff0000] text-xs tracking-widest font-bold">
                  {product.vendor ?? "ZYRAKO"}
                </p>
                {product.tags?.includes("limited") && (
                  <span className="font-jp text-xs border-2 border-[#ff0000] text-[#ff0000] px-2 py-0.5">
                    限定
                  </span>
                )}
                {product.tags?.includes("new") && (
                  <span className="font-jp text-xs border-2 border-[#ffff00] text-[#ffff00] px-2 py-0.5">
                    新着
                  </span>
                )}
              </div>
              <h1
                className="font-display text-[clamp(28px,3.5vw,52px)] text-white uppercase leading-tight glitch"
                data-text={product.title}
              >
                {product.title}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 border-b-2 border-white pb-6">
              {selectedVariant?.price && (
                <span className="font-display text-3xl text-white">
                  {formatMoney(
                    selectedVariant.price.amount,
                    selectedVariant.price.currencyCode
                  )}
                </span>
              )}
              {selectedVariant?.compareAtPrice &&
                parseFloat(selectedVariant.compareAtPrice.amount) >
                  parseFloat(selectedVariant.price?.amount ?? "0") && (
                  <span className="font-body text-sm text-white/40 line-through">
                    {formatMoney(
                      selectedVariant.compareAtPrice.amount,
                      selectedVariant.compareAtPrice.currencyCode
                    )}
                  </span>
                )}
            </div>

            {/* Options */}
            {product.options?.map((option: any) => (
              <div key={option.id}>
                <p className="font-body text-xs uppercase tracking-widest text-white/50 mb-3">
                  {option.name}:{" "}
                  <span className="text-white font-semibold">
                    {selectedOptions[option.name]}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {option.optionValues?.map((val: any) => {
                    const isSelected =
                      selectedOptions[option.name] === val.name;
                    const isAvailable =
                      val.firstAvailableVariant?.availableForSale ?? true;
                    return (
                      <button
                        key={val.id}
                        onClick={() =>
                          isAvailable &&
                          handleOptionSelect(option.name, val.name)
                        }
                        disabled={!isAvailable}
                        className={`font-body text-sm uppercase tracking-widest px-4 py-2 border-2 transition-colors duration-75 ${
                          isSelected
                            ? "border-[#ff0000] bg-[#ff0000] text-white"
                            : isAvailable
                            ? "border-white text-white hover:border-[#ff0000] hover:text-[#ff0000]"
                            : "border-white/20 text-white/25 line-through cursor-not-allowed"
                        }`}
                      >
                        {val.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale || adding}
              className={`w-full font-display text-xl uppercase tracking-widest py-5 border-4 transition-colors duration-75 ${
                selectedVariant?.availableForSale
                  ? added
                    ? "bg-white text-[#0a0a0a] border-white"
                    : "bg-[#ff0000] text-white border-[#ff0000] hover:bg-[#0a0a0a] hover:text-[#ff0000]"
                  : "bg-white/10 text-white/30 border-white/20 cursor-not-allowed"
              }`}
            >
              {added
                ? "✓ ADDED — カートに追加"
                : adding
                ? "ADDING..."
                : selectedVariant?.availableForSale
                ? "ADD TO CART — カートに追加"
                : "SOLD OUT — 売り切れ"}
            </button>

            {/* Accordions */}
            <div>
              <ProductAccordion
                title="PRODUCT DETAILS — 商品詳細"
                content={
                  product.description ||
                  "Heavyweight cotton. Oversized fit. Screen-printed graphic. Wash cold. Do not iron print."
                }
              />
              <ProductAccordion
                title="SIZING — サイズ"
                content="Oversized fit. Model wears size M, is 180cm. Size up if you prefer a more extreme drop shoulder. All measurements are in cm."
              />
              <ProductAccordion
                title="SHIPPING — 配送"
                content="Ships within 3–5 business days. Free shipping on orders over $150. International shipping available."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Related products strip */}
      <div className="border-t-2 border-white/30 px-6 py-12 max-w-[1600px] mx-auto">
        <p className="font-jp text-[#ff0000] text-xs tracking-widest mb-2">関連商品</p>
        <p className="font-display text-2xl text-white uppercase mb-8">YOU MIGHT ALSO LIKE</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-l-2 border-t-2 border-white">
          {MOCK_PRODUCTS.slice(0, 4).map((p) => (
            <div key={p.id} className="border-r-2 border-b-2 border-white">
              <Link to={`/products/${p.handle}`} className="group block">
                <div className="aspect-[3/4] overflow-hidden bg-white/5">
                  {p.featuredImage && (
                    <img
                      src={p.featuredImage.url}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-3 border-t-2 border-white panel-hover">
                  <p className="font-display text-sm text-white uppercase tracking-wide leading-tight truncate group-hover:text-[#ff0000] transition-colors duration-75">
                    {p.title}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
