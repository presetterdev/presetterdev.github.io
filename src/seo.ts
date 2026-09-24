import { faq, features, hero, pricing, specs, worksWith } from "./content";

// Everything a crawler needs that isn't the page itself. Change the URL here
// when the custom domain lands; index.html carries no absolute URLs.
export const site = {
  url: "https://presetter.audio/",
  name: "Presetter",
  title: "Presetter — every sound you own, inside Ableton Live 12's browser",
  description:
    "Stop opening plugin after plugin to find a sound. Presetter puts every " +
    "preset from every plugin you own inside Ableton Live 12's browser — " +
    "filtered with Live's own tags, previewed without loading anything. " +
    "macOS. Early access open.",
  image: "og.png",
  logo: "favicon.svg",
} as const;

const plugins: string[] = [];
for (const vendor of worksWith.vendors) {
  plugins.push(...vendor.plugins, ...(vendor.effects ?? []));
}

// Answers still in [brackets] are placeholders and stay out of the schema.
const finalFaq = faq.items.filter((item) => !item.answer.includes("["));

export function structuredData(): readonly Record<string, unknown>[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: site.url + site.logo,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: site.name,
      url: site.url,
      description: site.description,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "macOS",
      softwareRequirements: specs.items.map((item) => item.value).join("; "),
      featureList: features.items.map((item) => item.title),
      keywords: [
        "Ableton Live 12",
        "preset browser",
        "preset manager",
        "plugin presets",
        ...plugins,
      ].join(", "),
      offers: {
        "@type": "Offer",
        price: pricing.regularPrice.replace("$", ""),
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
        url: `${site.url}#pricing`,
      },
      slogan: hero.titleLines.join(" "),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: finalFaq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];
}

function attr(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

// Tags injected into <head> at build time by scripts/prerender.mjs.
export function headTags(): string {
  const json = JSON.stringify(structuredData()).replaceAll(
    "<",
    String.raw`\u003c`,
  );
  const image = site.url + site.image;
  return [
    `<link rel="canonical" href="${site.url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:url" content="${site.url}" />`,
    `<meta property="og:title" content="${attr(site.title)}" />`,
    `<meta property="og:description" content="${attr(site.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${attr(site.title)}" />`,
    `<meta name="twitter:description" content="${attr(site.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${json}</script>`,
  ].join("\n    ");
}
