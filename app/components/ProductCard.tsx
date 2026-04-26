import { Link } from "react-router";

interface ProductImage {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}

interface MoneyValue {
  amount: string;
  currencyCode: string;
}

interface Product {
  id: string;
  title: string;
  handle: string;
  availableForSale: boolean;
  tags: string[];
  featuredImage?: ProductImage | null;
  priceRange: {
    minVariantPrice: MoneyValue;
  };
  compareAtPriceRange?: {
    minVariantPrice: MoneyValue;
  };
}

interface ProductCardProps {
  product: Product;
}

function formatMoney(money: MoneyValue) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode,
  }).format(parseFloat(money.amount));
}

export function ProductCard({ product }: ProductCardProps) {
  const { title, handle, featuredImage, priceRange, availableForSale, tags } =
    product;
  const isNew = tags.includes("new");
  const isLimited = tags.includes("limited") || !availableForSale;
  const price = priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount =
    compareAt &&
    parseFloat(compareAt.amount) > parseFloat(price.amount);

  return (
    <Link
      to={`/products/${handle}`}
      className="group block border-2 border-white panel-hover overflow-hidden"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-white/5">
        {featuredImage ? (
          <img
            src={featuredImage.url}
            alt={featuredImage.altText ?? title}
            width={featuredImage.width ?? 600}
            height={featuredImage.height ?? 800}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="font-jp text-white/10 text-6xl font-black"
            >
              冬
            </span>
          </div>
        )}

        {/* Badge */}
        {isLimited && (
          <div className="absolute top-3 left-3 z-10 bg-[#ff0000] border-2 border-[#ff0000] px-2 py-0.5">
            <span className="font-jp text-white text-xs font-bold tracking-wide">
              限定
            </span>
          </div>
        )}
        {isNew && !isLimited && (
          <div className="absolute top-3 left-3 z-10 border-2 border-[#ffff00] px-2 py-0.5">
            <span className="font-jp text-[#ffff00] text-xs font-bold tracking-wide">
              新着
            </span>
          </div>
        )}

        {/* Sold out overlay */}
        {!availableForSale && (
          <div className="absolute inset-0 bg-[#0a0a0a]/75 flex items-center justify-center z-20">
            <span className="font-display text-white text-2xl tracking-widest border-4 border-white px-4 py-2 uppercase">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 border-t-2 border-white panel-hover">
        <p
          className="font-display text-white text-lg uppercase tracking-wide leading-tight glitch group-hover:text-[#ffff00] transition-colors duration-75 mb-3"
          data-text={title}
        >
          {title}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-body text-sm font-semibold text-white/80 tracking-wide">
              {formatMoney(price)}
            </span>
            {hasDiscount && (
              <span className="font-body text-xs text-white/40 line-through">
                {formatMoney(compareAt)}
              </span>
            )}
          </div>
          <span className="font-body text-xs uppercase tracking-widest text-[#ff0000] border-2 border-[#ff0000] px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            VIEW →
          </span>
        </div>
      </div>
    </Link>
  );
}
