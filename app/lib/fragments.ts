export const IMAGE_FRAGMENT = `#graphql
  fragment Image on Image {
    altText
    url
    width
    height
  }
`;

export const MONEY_FRAGMENT = `#graphql
  fragment Money on MoneyV2 {
    amount
    currencyCode
  }
`;

export const PRODUCT_CARD_FRAGMENT = `#graphql
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
  fragment ProductCard on Product {
    id
    title
    handle
    availableForSale
    tags
    featuredImage { ...Image }
    priceRange {
      minVariantPrice { ...Money }
    }
    compareAtPriceRange {
      minVariantPrice { ...Money }
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
        selectedOptions { name value }
      }
    }
  }
`;

export const PRODUCT_DETAIL_FRAGMENT = `#graphql
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
  fragment ProductDetail on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    vendor
    productType
    tags
    options {
      id
      name
      optionValues {
        id
        name
        firstAvailableVariant {
          id
          availableForSale
        }
      }
    }
    images(first: 8) { nodes { ...Image } }
    priceRange {
      minVariantPrice { ...Money }
    }
    variants(first: 50) {
      nodes {
        id
        title
        availableForSale
        selectedOptions { name value }
        price { ...Money }
        compareAtPrice { ...Money }
        image { ...Image }
      }
    }
  }
`;

export const CART_LINE_FRAGMENT = `#graphql
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
  fragment CartLine on CartLine {
    id
    quantity
    merchandise {
      ... on ProductVariant {
        id
        title
        product {
          title
          handle
          featuredImage { ...Image }
        }
        price { ...Money }
        selectedOptions { name value }
      }
    }
    cost {
      totalAmount { ...Money }
    }
  }
`;
