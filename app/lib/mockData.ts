export const MOCK_PRODUCTS = [
  {
    id: "gid://shopify/Product/1",
    title: "AKUMA OVERSIZED TEE",
    handle: "akuma-oversized-tee",
    availableForSale: true,
    tags: ["new"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
      altText: "AKUMA OVERSIZED TEE",
      width: 800,
      height: 1000,
    },
    priceRange: {
      minVariantPrice: { amount: "75.00", currencyCode: "USD" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "95.00", currencyCode: "USD" },
    },
    variants: {
      nodes: [
        {
          id: "gid://shopify/ProductVariant/1",
          availableForSale: true,
          selectedOptions: [{ name: "Size", value: "M" }],
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/2",
    title: "RONIN CARGO PANTS",
    handle: "ronin-cargo-pants",
    availableForSale: true,
    tags: ["new"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
      altText: "RONIN CARGO PANTS",
      width: 800,
      height: 1000,
    },
    priceRange: {
      minVariantPrice: { amount: "130.00", currencyCode: "USD" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "130.00", currencyCode: "USD" },
    },
    variants: {
      nodes: [
        {
          id: "gid://shopify/ProductVariant/2",
          availableForSale: true,
          selectedOptions: [{ name: "Size", value: "L" }],
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/3",
    title: "SHINIGAMI BOMBER",
    handle: "shinigami-bomber",
    availableForSale: false,
    tags: ["limited"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      altText: "SHINIGAMI BOMBER",
      width: 800,
      height: 1000,
    },
    priceRange: {
      minVariantPrice: { amount: "195.00", currencyCode: "USD" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "195.00", currencyCode: "USD" },
    },
    variants: {
      nodes: [
        {
          id: "gid://shopify/ProductVariant/3",
          availableForSale: false,
          selectedOptions: [{ name: "Size", value: "S" }],
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/4",
    title: "VOID SEASON HOODIE",
    handle: "void-season-hoodie",
    availableForSale: true,
    tags: [],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80",
      altText: "VOID SEASON HOODIE",
      width: 800,
      height: 1000,
    },
    priceRange: {
      minVariantPrice: { amount: "155.00", currencyCode: "USD" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "155.00", currencyCode: "USD" },
    },
    variants: {
      nodes: [
        {
          id: "gid://shopify/ProductVariant/4",
          availableForSale: true,
          selectedOptions: [{ name: "Size", value: "M" }],
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/5",
    title: "KAMI GRAPHIC LONG SLEEVE",
    handle: "kami-graphic-long-sleeve",
    availableForSale: true,
    tags: ["limited"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      altText: "KAMI GRAPHIC LONG SLEEVE",
      width: 800,
      height: 1000,
    },
    priceRange: {
      minVariantPrice: { amount: "90.00", currencyCode: "USD" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "90.00", currencyCode: "USD" },
    },
    variants: {
      nodes: [
        {
          id: "gid://shopify/ProductVariant/5",
          availableForSale: true,
          selectedOptions: [{ name: "Size", value: "L" }],
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/6",
    title: "SENPAI WIDE LEG DENIM",
    handle: "senpai-wide-leg-denim",
    availableForSale: true,
    tags: ["new"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
      altText: "SENPAI WIDE LEG DENIM",
      width: 800,
      height: 1000,
    },
    priceRange: {
      minVariantPrice: { amount: "145.00", currencyCode: "USD" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "175.00", currencyCode: "USD" },
    },
    variants: {
      nodes: [
        {
          id: "gid://shopify/ProductVariant/6",
          availableForSale: true,
          selectedOptions: [{ name: "Size", value: "30" }],
        },
      ],
    },
  },
];

export const MOCK_PRODUCT_DETAIL = {
  ...MOCK_PRODUCTS[0],
  description:
    "Heavyweight 400gsm cotton. Dropped shoulders. Raw edge hem. Screen-printed front graphic. Made for those who don't ask permission. Wash cold. Do not iron the print.",
  descriptionHtml:
    "<p>Heavyweight 400gsm cotton. Dropped shoulders. Raw edge hem. Screen-printed front graphic.</p><p>Made for those who don't ask permission. Wash cold. Do not iron the print.</p>",
  vendor: "ZYRAKO",
  productType: "Tops",
  options: [
    {
      id: "option-size",
      name: "Size",
      optionValues: [
        {
          id: "val-xs",
          name: "XS",
          firstAvailableVariant: {
            id: "var-xs",
            availableForSale: true,
          },
        },
        {
          id: "val-s",
          name: "S",
          firstAvailableVariant: {
            id: "var-s",
            availableForSale: true,
          },
        },
        {
          id: "val-m",
          name: "M",
          firstAvailableVariant: {
            id: "var-m",
            availableForSale: true,
          },
        },
        {
          id: "val-l",
          name: "L",
          firstAvailableVariant: {
            id: "var-l",
            availableForSale: true,
          },
        },
        {
          id: "val-xl",
          name: "XL",
          firstAvailableVariant: {
            id: "var-xl",
            availableForSale: false,
          },
        },
      ],
    },
  ],
  images: {
    nodes: [
      {
        url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
        altText: "AKUMA OVERSIZED TEE - Front",
        width: 800,
        height: 1000,
      },
      {
        url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
        altText: "AKUMA OVERSIZED TEE - Back",
        width: 800,
        height: 1000,
      },
    ],
  },
  variants: {
    nodes: [
      {
        id: "var-xs",
        title: "XS",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "XS" }],
        price: { amount: "75.00", currencyCode: "USD" },
        compareAtPrice: { amount: "95.00", currencyCode: "USD" },
        image: null,
      },
      {
        id: "var-s",
        title: "S",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "S" }],
        price: { amount: "75.00", currencyCode: "USD" },
        compareAtPrice: { amount: "95.00", currencyCode: "USD" },
        image: null,
      },
      {
        id: "var-m",
        title: "M",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "M" }],
        price: { amount: "75.00", currencyCode: "USD" },
        compareAtPrice: { amount: "95.00", currencyCode: "USD" },
        image: null,
      },
      {
        id: "var-l",
        title: "L",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "L" }],
        price: { amount: "75.00", currencyCode: "USD" },
        compareAtPrice: { amount: "95.00", currencyCode: "USD" },
        image: null,
      },
      {
        id: "var-xl",
        title: "XL",
        availableForSale: false,
        selectedOptions: [{ name: "Size", value: "XL" }],
        price: { amount: "75.00", currencyCode: "USD" },
        compareAtPrice: { amount: "95.00", currencyCode: "USD" },
        image: null,
      },
    ],
  },
};

export const MOCK_COLLECTION = {
  id: "gid://shopify/Collection/1",
  title: "ALL DROPS",
  handle: "all",
  description: "THE FULL ARCHIVE. WEAR THE CULTURE.",
  image: null,
  products: {
    pageInfo: {
      hasPreviousPage: false,
      hasNextPage: false,
      startCursor: null,
      endCursor: null,
    },
    nodes: MOCK_PRODUCTS,
  },
};
