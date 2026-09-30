// Every word on the site lives here. Components only lay it out, so a copy
// change is an edit to this file and nothing else. [Brackets] mark facts
// still to be confirmed.

export const nav = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Plugins", href: "#plugins" },
  { label: "Specs", href: "#specs" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const cta = {
  label: "Get early access",
  href: "#early-access",
  // Tally form id; every CTA opens it as a modal, with the anchor as fallback.
  tallyId: "gD2NoO",
  micro: "$79 launch price for the list. First build first. No spam.",
} as const;

// Repeated after the sections that build belief.
export const midCta = {
  afterComparison: {
    title: "See it with your own library.",
    body: "Early access gets the first build and the launch price.",
  },
  afterFeatures: {
    title: "Every plugin you own, one browser.",
    body: "Join the list and we'll tell you when your plugins are covered.",
  },
} as const;

export const hero = {
  // Rendered as two lines on wide screens.
  titleLines: ["Stop opening plugin after plugin", "to find a sound."],
  lede:
    "Every preset you own, inside Live 12's browser — filtered with Live's " +
    "own tags, heard before anything loads, dragged in when you're sure.",
  trust:
    "For macOS and Ableton Live 12. Runs locally; nothing leaves your Mac.",
} as const;

// The hero illustration: Live's browser once Presetter has built the Pack.
export const mock = {
  filters: [
    {
      group: "Sounds",
      options: [
        { label: "Pad", active: true },
        { label: "Keys", active: false },
        { label: "Bass", active: false },
        { label: "Lead", active: false },
      ],
    },
    {
      group: "Character",
      options: [
        { label: "Warm", active: true },
        { label: "Dark", active: false },
        { label: "Wide", active: false },
        { label: "Evolving", active: false },
      ],
    },
    {
      group: "Vendor",
      options: [
        { label: "All", active: true },
        { label: "Arturia", active: false },
        { label: "Spectrasonics", active: false },
        { label: "u-he", active: false },
      ],
    },
  ],
  rows: [
    { preset: "Analog Halo", plugin: "Pigments", playing: true },
    { preset: "Dust Choir", plugin: "Omnisphere", playing: false },
    { preset: "Glass Pad", plugin: "Serum 2", playing: false },
    { preset: "Slow Bloom", plugin: "Diva", playing: false },
    { preset: "Tape Pad", plugin: "FM8", playing: false },
    { preset: "Warm Vinyl", plugin: "Massive X", playing: false },
  ],
  status: "6 of 4,812 presets, from 14 plugins",
} as const;

// The comparison: how a pad gets found today, and with Presetter. The
// plugin windows are generic chrome with the vendor's name and its own
// category label; no vendor interface is reproduced.
export const comparison = {
  today: {
    label: "Today",
    windows: [
      {
        vendor: "Serum 2",
        category: "PADS",
        presets: ["Warm Halo", "Glass Bed", "Vinyl Pad"],
      },
      {
        vendor: "Omnisphere",
        category: "Pads + Strings",
        presets: ["Dust Choir", "Slow Sky", "Felt Pad"],
      },
      {
        vendor: "Kontakt",
        category: "Synth Pad",
        presets: ["Analog Wash", "Tape Ensemble", "Air"],
      },
      {
        vendor: "Pigments",
        category: "Pad",
        presets: ["Analog Halo", "Bloom", "Soft Wall"],
      },
      {
        vendor: "Diva",
        category: "Pads",
        presets: ["Slow Bloom", "Juno Bed", "Warm Sea"],
      },
    ],
    caption:
      "Five plugins, five browsers, five names for a pad — opened one at a " +
      "time.",
  },
  withPresetter: {
    label: "With Presetter",
    caption:
      "One browser. One set of filters. Every plugin's pads in one list, " +
      "with a preview for each.",
  },
} as const;

export const positioning = {
  title: "The template is the workaround.",
  body: [
    "Hunting one sound across five plugin browsers takes a few minutes on a " +
      "good day and half an hour on a bad one, and most producers have " +
      "forgotten most of what they own. So they stop hunting and build a " +
      "template: the same synths pre-loaded, the same go-to presets, every " +
      "session. It's fast. It's also why the rest of the collection never " +
      "gets opened, and why track twelve sounds like track three.",
    "Presetter makes Live's browser the template. Every preset from every " +
      "plugin you own, filed under its maker's own categories, filtered the " +
      "way Live filters everything else. Previews are rendered audio, so you " +
      "audition without loading a plugin and the session starts light. Drag " +
      "in only what makes the cut. Less time in plugin browsers, more time " +
      "on the track.",
  ],
} as const;

// Where the Pack shows up in Live's browser.
export const tree = {
  path: ["Packs", "Presetter"],
  rows: [
    { name: "Serum 2", detail: "1,204 presets" },
    { name: "Omnisphere", detail: "2,116 presets" },
    { name: "Kontakt", detail: "864 presets" },
    { name: "Pigments", detail: "1,532 presets" },
    { name: "Diva", detail: "1,980 presets" },
  ],
  caption:
    "The Pack sits under Packs in Live's browser, beside Ableton's own " +
    "content. Every preset carries its maker's categories and a preview.",
} as const;

export interface Step {
  title: string;
  body: string;
}

export const howItWorks: { title: string; steps: readonly Step[] } = {
  title: "Run it once. Use it every day.",
  steps: [
    {
      title: "Scan your plugins.",
      body:
        "Point Presetter at your plugins and choose which to include — skip " +
        "demos and anything you don't use. It reads the presets already " +
        "installed on your Mac, and the categories each manufacturer gave " +
        "them.",
    },
    {
      title: "Build the Pack.",
      body:
        "Presetter converts each preset into a format Live loads directly, " +
        "maps the manufacturer's categories and descriptors onto Live 12's " +
        "tags, and renders a short audio preview from your own copy of the " +
        "plugin. A large library takes 30 minutes or more; it's a one-time " +
        "job.",
    },
    {
      title: "Browse in Live.",
      body:
        "The Pack appears in Live 12's browser. Filter by type, character, or " +
        "vendor, hear the preview, and drag it in — the plugin loads with the " +
        "preset and its macros ready to tweak. When you install something " +
        "new, run Presetter again.",
    },
  ],
};

export type FeatureKind =
  "filters" | "preview" | "mapping" | "vendor" | "kinds" | "load";

export interface Feature {
  kind: FeatureKind;
  title: string;
  body: string;
}

export const features: { title: string; items: readonly Feature[] } = {
  title:
    "Live 12 tags what Ableton makes. Presetter tags everything else you own.",
  items: [
    {
      kind: "filters",
      title: "One set of filters for every plugin",
      body:
        "Pick a sound and a character in Live 12's filters — Pad and Warm, " +
        "Lead and Plucked, Synth Bass and Deep, Strings and Evolving — and " +
        "every match from every plugin you own lands in one list. What used " +
        "to take five browsers takes one filter.",
    },
    {
      kind: "preview",
      title: "Audition without loading",
      body:
        "Every preset has a rendered preview. Hear it from the browser with " +
        "nothing loaded, and load the plugin only for the sounds that make " +
        "the cut. Your session stays light.",
    },
    {
      kind: "mapping",
      title: "The manufacturer's tags, in Live",
      body:
        "Every plugin maker categorizes its presets its own way: Serum says " +
        "Pads, Omnisphere says Pads + Strings, Kontakt says Synth Pad. " +
        "Presetter reads each maker's categories and maps them into Live " +
        "12's tags, so five taxonomies become one.",
    },
    {
      kind: "vendor",
      title: "Filter by vendor",
      body:
        "Narrow the list to one developer — everything from Arturia, or only " +
        "Serum — with a single tag.",
    },
    {
      kind: "kinds",
      title: "Instruments and effects",
      body:
        "Synths, samplers, sample libraries, and effects are indexed, tagged, " +
        "and previewed the same way.",
    },
    {
      kind: "load",
      title: "Tweak without leaving Live",
      body:
        "Load a preset and the plugin comes with it, already in your device " +
        "chain with its macros mapped. Shape the sound in Live instead of " +
        "hunting through the plugin's own browser.",
    },
  ],
};

export const rediscovery = {
  title: "Which synths do you own but never open?",
  body:
    "Every producer can name one without hesitation. Instruments bought in a " +
    "bundle or for a single track end up behind a browser that never gets " +
    "opened — and outside the template. Presetter lists their presets beside " +
    "everything else, so the whole collection is back in play.",
  shelf: {
    heading: "Last opened",
    rows: [
      { plugin: "Serum 2", opened: "Today" },
      { plugin: "Omnisphere", opened: "2 weeks ago" },
      { plugin: "Kontakt", opened: "3 months ago" },
      { plugin: "Pigments", opened: "7 months ago" },
      { plugin: "Diva", opened: "14 months ago" },
      { plugin: "Massive X", opened: "2 years ago" },
      { plugin: "FM8", opened: "Never" },
    ],
    result: "With Presetter: all 7, in one filter.",
  },
} as const;

export interface Vendor {
  name: string;
  plugins: readonly string[];
  effects?: readonly string[];
}

export const worksWith: {
  title: string;
  intro: string;
  vendors: readonly Vendor[];
  nksTitle: string;
  nks: string;
  nksChips: readonly string[];
  request: string;
  disclaimer: string;
} = {
  title: "Works with the plugins you already own.",
  intro: "Tested end to end.",
  vendors: [
    { name: "Xfer Records", plugins: ["Serum", "Serum 2"] },
    { name: "Spectrasonics", plugins: ["Omnisphere", "Keyscape"] },
    {
      name: "Native Instruments",
      plugins: [
        "Kontakt",
        "Massive",
        "Massive X",
        "FM8",
        "Battery 4",
        "Guitar Rig",
      ],
      effects: [
        "Driver",
        "Replika XT",
        "Raum",
        "Phasis",
        "Flair",
        "Freak",
        "Choral",
        "Bite",
        "Dirt",
      ],
    },
    { name: "Arturia", plugins: ["Pigments", "V Collection"] },
    {
      name: "Valhalla DSP",
      plugins: ["VintageVerb", "Supermassive", "SpaceModulator"],
    },
  ],
  nksTitle: "Plus every NKS-ready plugin.",
  nks:
    "NKS is Native Instruments' preset standard: 250+ developers, 2,000+ " +
    "instruments and effects. If a plugin is NKS-ready, Presetter reads its " +
    "presets.",
  nksChips: [
    "u-he Diva",
    "u-he Zebra",
    "u-he Hive",
    "UVI Falcon",
    "Rob Papen",
    "Heavyocity",
    "Output",
    "2,000+ more",
  ],
  request: "Something missing? Request a plugin on the early-access form.",
  disclaimer:
    "All manufacturer and product names mentioned on this site are trademarks " +
    "of their respective owners, which are in no way associated or affiliated " +
    "with Presetter. They are used solely to identify the products Presetter " +
    "works with and do not suggest affiliation, sponsorship, or endorsement.",
};

export interface Spec {
  term: string;
  value: string;
}

export const specs: { title: string; items: readonly Spec[] } = {
  title: "Specifications",
  items: [
    {
      term: "Platform",
      value:
        "macOS 11 Big Sur or later, Intel Core i5 or Apple silicon, 8 GB RAM " +
        "— the same requirements as Ableton Live 12",
    },
    { term: "Host", value: "Ableton Live 12.0 or later" },
    { term: "Plugin formats", value: "[VST3 and Audio Units]" },
    {
      term: "Requires",
      value: "The plugins themselves, installed and licensed on the same Mac",
    },
    {
      term: "Output",
      value:
        "One Ableton Pack: every preset converted for direct loading in Live, " +
        "the manufacturer's categories and descriptors mapped to Live 12 " +
        "tags, and an audio preview per preset",
    },
    { term: "Windows", value: "Planned. Not available at launch." },
    { term: "Delivery", value: "Direct download, [notarized for macOS]" },
  ],
};

export const pricing = {
  title: "One license. One payment.",
  badge: "Launch price for the early-access list",
  launchPrice: "$79",
  regularPrice: "$149",
  note: "One-time purchase. No subscription.",
  includes: [
    "Every plugin supported at launch",
    "New adapters and updates for 12 months",
    "Perpetual license — keeps working after updates end",
  ],
} as const;

export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: { title: string; items: readonly FaqItem[] } = {
  title: "FAQ",
  items: [
    {
      question: "Does Presetter copy or distribute presets or sounds?",
      answer:
        "No. Presetter reads preset files already installed on your Mac and " +
        "writes them into an Ableton Pack on the same machine. Previews are " +
        "rendered locally from your own licensed copy of each plugin. Nothing " +
        "is uploaded and nothing is redistributed.",
    },
    {
      question: "Where do the categories and tags come from?",
      answer:
        "From the plugin manufacturers. Each one ships its presets with its " +
        "own categories and descriptors. Presetter reads them from the preset " +
        "files and maps them into Live 12's tag system, so you filter every " +
        "plugin the same way you filter Ableton's own content.",
    },
    {
      question: "What happens when I load a preset?",
      answer:
        "The plugin loads in your device chain with the preset already " +
        "selected and its macros mapped. You can play it and adjust it from " +
        "Live without opening the plugin's own browser.",
    },
    {
      question: "Do I still need the plugins?",
      answer:
        "Yes. A preset is a set of parameter values; the plugin produces the " +
        "sound. Presets for a plugin that isn't installed won't load.",
    },
    {
      question: "Is Presetter a plugin?",
      answer:
        "No. It's a standalone macOS application. It runs when you build or " +
        "update your Pack. Nothing runs inside Live, and it has no effect on " +
        "Live's performance.",
    },
    {
      question: "Which versions of Live are supported?",
      answer:
        "Ableton Live 12.0 and later. Tag filtering relies on browser " +
        "features introduced in Live 12.",
    },
    {
      question: "Is Windows supported?",
      answer:
        "Not at launch. Windows is planned; join the early-access list to be " +
        "notified.",
    },
    {
      question: "How long does the first build take?",
      answer:
        "It depends on the size of your library. Because Presetter renders a " +
        "preview for every preset, a large collection can take 30 minutes or " +
        "more. [Subsequent runs only process what's new.]",
    },
    {
      question: "Are effects supported?",
      answer:
        "Yes. Effect presets are indexed, tagged, and previewed the same way " +
        "as instruments.",
    },
    {
      question: "My plugin isn't listed.",
      answer:
        "If it's NKS-ready, it's supported. If it isn't, request it on the " +
        "early-access form — requests set the adapter roadmap.",
    },
    {
      question: "What happens when a plugin changes its preset format?",
      answer:
        "Run Presetter again. Adapters are maintained as vendors change their " +
        "formats, and updates are included for the first year.",
    },
    {
      question: "Do I need Komplete Kontrol or other NI software?",
      answer:
        "No. Presetter reads preset files directly. No Native Instruments " +
        "software is required.",
    },
    {
      question: "Is there a trial?",
      answer:
        "[Under consideration: free for the first 20 presets of each plugin, " +
        "so you can check your library before you buy.]",
    },
    {
      question: "What is the refund policy?",
      answer:
        "All sales are final. Presetter delivers its full output the first " +
        "time it runs — the Pack stays on your Mac whether or not the app " +
        "does — so a license can't be returned. [Check your library with the " +
        "free tier before you buy.]",
    },
  ],
};

export const origin = {
  title: "Built in a working studio.",
  body:
    "Presetter started as a tool we built for our own sessions — producers " +
    "with large plugin collections and no single place to find a sound. It " +
    "has been in daily use in our studio for over a year, and it's being " +
    "tested now with working producers in New York, Berlin, and Los Angeles.",
} as const;

export const earlyAccess = {
  title: "Get early access",
  body:
    "Leave your email and the plugins you own. The list receives the first " +
    "build and launch pricing.",
} as const;

export const footer = {
  columns: [
    {
      heading: "Product",
      links: [
        { label: "How it works", href: "#how-it-works" },
        { label: "Plugins", href: "#plugins" },
        { label: "Specifications", href: "#specs" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "#origin" },
        { label: "Early access", href: "#early-access" },
      ],
    },
  ],
  copyright: "© 2026 Presetter",
  disclaimer:
    "Presetter is independent software. All manufacturer and product names " +
    "mentioned on this site are trademarks of their respective owners, which " +
    "are in no way associated or affiliated with Presetter. They are used " +
    "solely to identify the products Presetter works with and do not suggest " +
    "affiliation, sponsorship, or endorsement.",
} as const;
