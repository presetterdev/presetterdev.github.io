// Every word on the site lives here. Components only lay it out, so a copy
// change is an edit to this file and nothing else. [Brackets] mark facts
// still to be confirmed.

// Anchors carry the path so they also work from /license and /privacy.
export const nav = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Plugins", href: "/#plugins" },
  { label: "Specs", href: "/#specs" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const cta = {
  label: "Get early access",
  href: "/#early-access",
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

// Where the Pack shows up in Live's browser: the folder Presetter built,
// added to Places. "Presetter" is the example name; the user picks it.
export const tree = {
  path: ["Places", "Presetter"],
  rows: [
    { name: "Serum 2", detail: "1,204 presets" },
    { name: "Omnisphere", detail: "2,116 presets" },
    { name: "Kontakt", detail: "864 presets" },
    { name: "Pigments", detail: "1,532 presets" },
    { name: "Diva", detail: "1,980 presets" },
  ],
  caption:
    "The pack folder sits under Places in Live's browser, beside your own " +
    "folders. Every preset carries its maker's categories and a preview.",
} as const;

export interface Step {
  title: string;
  body: string;
}

// The literal sequence a new user follows, in order. Steps are the product's
// actual flow, not a summary of it; change them only when the app changes.
export const howItWorks: {
  title: string;
  lede: string;
  steps: readonly Step[];
} = {
  title: "Run it once. Use it every day.",
  lede:
    "Presetter builds a pack from the plugins you already own and hands it " +
    "to Ableton Live. After that, you look for sounds in Live — not in " +
    "plugin windows.",
  steps: [
    {
      title: "Download and install Presetter.",
      body: "macOS, with Ableton Live 12 or later.",
    },
    {
      title: "Presetter scans your system for plugins.",
      body:
        "Automatic — nothing to configure. It finds the instruments and " +
        "effects installed on your Mac.",
    },
    {
      title: "Pick the plugins you want and add them to a pack.",
      body:
        "Name the pack folder. That name is what you'll see in Live's " +
        "browser.",
    },
    {
      title: "Presetter generates the pack.",
      body:
        "A pack is a folder Ableton Live knows how to browse. Presetter " +
        "writes every preset from the plugins you picked into it, with each " +
        "manufacturer's own categories carried across as Live 12 tags and a " +
        "rendered preview for each sound.",
    },
    {
      title: "Drag the new folder into Places in Live's browser sidebar.",
      body:
        "Done. Your presets are now searchable by tag and previewable inside " +
        "Live without loading a plugin. When you update the pack in " +
        "Presetter — a new plugin, new presets — the changes show up in Live " +
        "on their own.",
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
    {
      term: "Delivery",
      value: "Direct download, signed and notarized for macOS",
    },
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
      question: "Is there a beta?",
      answer:
        "Yes. A closed beta is running now on macOS. Testers come from the " +
        "early-access list and are picked to cover different plugin " +
        "collections, so tell us what you own when you join. Beta builds " +
        "come with a free, time-limited license key.",
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
        { label: "How it works", href: "/#how-it-works" },
        { label: "Plugins", href: "/#plugins" },
        { label: "Specifications", href: "/#specs" },
        { label: "Pricing", href: "/#pricing" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/#origin" },
        { label: "Early access", href: "/#early-access" },
        { label: "License agreement", href: "/license" },
        { label: "Privacy", href: "/privacy" },
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

// Legal pages. Each renders as /<slug>. Paragraphs are plain text; a section
// may carry a bullet list and paragraphs after it. The licensor is one
// constant so the entity change at incorporation is a one-line edit.
export interface LegalSection {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  after?: readonly string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  updated: string;
  intro: readonly string[];
  sections: readonly LegalSection[];
}

// [Bracketed] until the entity is settled: pre-incorporation, the licensor
// is a person doing business as Presetter.
export const legalEntity = "[Justin Siegel, doing business as Presetter]";

export const license: LegalDoc = {
  slug: "license",
  title: "Presetter License Agreement",
  updated: "October 13, 2026",
  intro: [
    "This agreement is between " +
      legalEntity +
      ' ("Presetter," "we") and you. It covers the Presetter ' +
      "application for macOS, including pre-release (beta) builds, " +
      'updates, and documentation (together, the "Software").',
    "By installing or using the Software you agree to this agreement. " +
      "If you don't agree, don't install or use it.",
  ],
  sections: [
    {
      heading: "Beta builds",
      paragraphs: [
        "This section applies to any pre-release build, and takes " +
          "precedence over the rest of the agreement while you use one.",
      ],
      bullets: [
        "Beta builds are unfinished. They may have bugs, may change " +
          "without notice, and may stop working when the beta ends or " +
          "your beta key expires.",
        "Beta license keys are free, personal, and expire on the date " +
          "we give you. When a key expires the Software stops running; " +
          "it doesn't remove the pack it already built.",
        "Don't share the build or your key with anyone, and don't " +
          "post either anywhere. Beta builds are for you, on Macs you " +
          "own.",
        "Back up your Ableton User Library before you run a beta " +
          "build, as you would before running any pre-release software.",
        "Anything you tell us about the Software — bugs, ideas, " +
          "suggestions, what you saw in a session — we may use freely " +
          "to improve it, with no obligation to you.",
        "A beta key doesn't entitle you to a release license or a " +
          "price, and we may end the beta at any time.",
      ],
      after: [
        "When the beta ends, this section stops applying, and the " +
          "rest of this agreement governs any release version you " +
          "license.",
      ],
    },
    {
      heading: "Your license",
      paragraphs: [
        "Subject to this agreement — and, for a release version, " +
          "payment of the license fee — we grant you a perpetual, " +
          "non-exclusive, non-transferable license to install and use " +
          "the version of the Software you're licensed for, on up to " +
          "[two] Macs you own or control, for your own music " +
          "production. Anything beyond that, such as use across a " +
          "studio or an organization, needs a separate license from us.",
        "The Software is licensed, not sold. We keep every right in " +
          "it that this agreement doesn't expressly give you.",
      ],
    },
    {
      heading: "License keys",
      paragraphs: [
        "The Software activates with a license key and confirms the " +
          "key with our licensing service when it runs, which needs an " +
          "internet connection at that moment. Don't share, sell, or " +
          "publish your key. We may deactivate keys that are shared, " +
          "exceed their activation limit, or were obtained by fraud, " +
          "chargeback, or a breach of this agreement.",
      ],
    },
    {
      heading: "What the Software does with your presets",
      paragraphs: [
        "The Software reads the preset files of plugins installed and " +
          "licensed on your Mac and writes them into a folder Ableton " +
          "Live can browse, for your own use. It writes a new folder; " +
          "it doesn't upload your files, and it doesn't modify your " +
          "plugins or their original presets.",
        "You're responsible for holding valid licenses to every " +
          "plugin whose presets you process, and for complying with " +
          "those plugins' own terms. Presetter is independent software: " +
          "it isn't affiliated with, endorsed by, or connected to any " +
          "plugin or software vendor. Product and company names are " +
          "their owners' trademarks and are used only to say what the " +
          "Software works with.",
      ],
    },
    {
      heading: "What you may not do",
      paragraphs: [
        "Except where this agreement allows it, or the law allows it " +
          "regardless of this agreement, you may not:",
      ],
      bullets: [
        "resell, rent, lend, sublicense, or otherwise transfer the " +
          "Software or your license key;",
        "reverse engineer, decompile, or disassemble the Software, or " +
          "try to derive its source code;",
        "get around or disable the license key, activation, or any " +
          "other licensing or security mechanism;",
        "remove or alter proprietary notices; or",
        "use the Software to infringe anyone's rights or to break the " +
          "law.",
      ],
    },
    {
      heading: "Updates",
      paragraphs: [
        "A release license includes updates and newly added plugin " +
          "support for twelve months from purchase. After that, the " +
          "last version you received keeps working, with no obligation " +
          "to upgrade. We're not obliged to release any particular " +
          "update, plugin support, or future version.",
      ],
    },
    {
      heading: "Privacy",
      paragraphs: [
        "The Software runs on your Mac and your preset files stay " +
          "there. The little we do collect — a license key, an " +
          "identifier for your Mac, the app version — is described in " +
          "the Presetter Privacy Policy, which is part of this " +
          "agreement.",
      ],
    },
    {
      heading: "No refunds",
      paragraphs: [
        "All sales of a release license are final. The Software " +
          "delivers its full output the first time it runs — the pack " +
          "stays on your Mac whether or not the Software does — so a " +
          "license can't be returned. Check the plugin list and the " +
          "system requirements before you buy.",
      ],
    },
    {
      heading: "No warranty",
      paragraphs: [
        'THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE," ' +
          "WITHOUT WARRANTIES OF ANY KIND, EXPRESS, IMPLIED, OR " +
          "STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, " +
          "FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE " +
          "DON'T WARRANT THAT THE SOFTWARE WILL BE ERROR-FREE, THAT IT " +
          "WILL CORRECTLY PROCESS ANY PARTICULAR PLUGIN OR PRESET, OR " +
          "THAT IT WILL KEEP WORKING WITH FUTURE VERSIONS OF MACOS, " +
          "ABLETON LIVE, OR ANY PLUGIN.",
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        "TO THE FULLEST EXTENT THE LAW ALLOWS, WE WON'T BE LIABLE FOR " +
          "ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR " +
          "PUNITIVE DAMAGES, OR FOR LOST DATA, LOST PROFITS, OR LOST " +
          "GOODWILL, ARISING FROM THE SOFTWARE OR THIS AGREEMENT. OUR " +
          "TOTAL LIABILITY WON'T EXCEED THE AMOUNT YOU PAID US FOR THE " +
          "SOFTWARE IN THE TWELVE MONTHS BEFORE THE CLAIM, OR FIFTY US " +
          "DOLLARS IF YOU PAID NOTHING. SOME JURISDICTIONS DON'T ALLOW " +
          "SOME OF THESE LIMITS, SO SOME MAY NOT APPLY TO YOU.",
      ],
    },
    {
      heading: "Ending this agreement",
      paragraphs: [
        "This agreement lasts until it ends. It ends automatically if " +
          "you break it, and a beta license ends when the beta or your " +
          "key does. When it ends, stop using the Software and delete " +
          "it; we may deactivate your key. The sections on your " +
          "presets, what you may not do, privacy, refunds, warranty, " +
          "liability, governing law, and everything else survive.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [
        "This agreement is governed by the laws of the State of New " +
          "York, without regard to its conflict-of-laws rules. Any " +
          "dispute about it will be brought in the state or federal " +
          "courts located in New York County, New York, and you and we " +
          "each consent to those courts.",
      ],
    },
    {
      heading: "Everything else",
      paragraphs: [
        "This is the whole agreement between you and us about the " +
          "Software, and it replaces anything earlier. We may update it " +
          "for new versions of the Software; the version you accepted " +
          "governs the version you have, unless you accept a later one. " +
          "If part of it can't be enforced, the rest still applies. You " +
          "may not assign it; we may, as part of a sale, merger, or " +
          "reorganization of the business. Not enforcing a term isn't a " +
          "waiver of it.",
        "Questions: support@presetter.audio.",
      ],
    },
  ],
};

export const privacy: LegalDoc = {
  slug: "privacy",
  title: "Presetter Privacy Policy",
  updated: "October 13, 2026",
  intro: [
    "Presetter is built to run on your Mac and keep your files there. " +
      "This policy says what little we collect, why, and who handles " +
      "it. It's issued by " +
      legalEntity +
      ' ("we"), and it applies to presetter.audio and to the Presetter ' +
      "application.",
  ],
  sections: [
    {
      heading: "The short version",
      paragraphs: [],
      bullets: [
        "Your presets and your pack never leave your Mac.",
        "We collect an email address if you give us one, and a " +
          "license-key check when the app runs.",
        "We don't sell data, and the site sets no analytics or " +
          "advertising cookies.",
      ],
    },
    {
      heading: "What we collect on the website",
      paragraphs: [
        "The early-access form asks for your email address and which " +
          "plugins you own, plus anything else you choose to tell us. " +
          "The form is run by Tally, which stores the answers for us. " +
          "We use them to send beta invitations, launch news, and " +
          "product emails about Presetter, and to decide which plugins " +
          "to support next. Every email we send has an unsubscribe " +
          "link, and you can ask us to delete your answers at any time.",
        "The site is hosted on GitHub Pages. Like any web host, " +
          "GitHub may log the IP address and browser details of " +
          "visitors under its own privacy statement. We run no " +
          "analytics or advertising cookies on the site. If that " +
          "changes, this policy will say so first.",
      ],
    },
    {
      heading: "What we collect in the app",
      paragraphs: [
        "The app reads the preset files of the plugins on your Mac " +
          "and writes a pack folder on the same Mac. Those files are " +
          "never uploaded to us or to anyone else.",
        "When you activate the app or run it, it sends your license " +
          "key, an identifier for your Mac, and the app's version to " +
          "our licensing service, Keygen, to confirm that the key is " +
          "valid and within its activation limit. That's what makes a " +
          "license work on your Macs and not on everyone else's.",
        "The app doesn't send us usage statistics or crash reports. " +
          "If we add either, it will be opt-in, and this policy will " +
          "describe it.",
      ],
    },
    {
      heading: "Email and support",
      paragraphs: [
        "If you email us, we keep the conversation so we can help you " +
          "and see the history if you write again. Our email runs on " +
          "Google Workspace.",
      ],
    },
    {
      heading: "Who handles data for us",
      paragraphs: [],
      bullets: [
        "Tally — the early-access form.",
        "Keygen — license keys and activation.",
        "Google Workspace — email.",
        "GitHub — website hosting.",
      ],
      after: [
        "Each handles data only to provide its service to us, under " +
          "its own privacy terms. We don't sell personal information, " +
          "and we don't share it with anyone else unless the law " +
          "requires it.",
      ],
    },
    {
      heading: "Keeping and deleting",
      paragraphs: [
        "We keep form answers and email while Presetter exists or " +
          "until you ask us to delete them. License records are kept " +
          "while the license is active and for our own records after " +
          "that. To unsubscribe, use the link in any email; to ask for " +
          "a copy of your data or have it deleted, write to " +
          "support@presetter.audio.",
      ],
    },
    {
      heading: "Children",
      paragraphs: [
        "Presetter isn't directed at children under 13, and we don't " +
          "knowingly collect their information. If you think a child " +
          "has given us some, tell us and we'll delete it.",
      ],
    },
    {
      heading: "Do Not Track",
      paragraphs: [
        "We don't track visitors across other sites, so there's " +
          "nothing for a Do Not Track signal to switch off.",
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        "If this policy changes, we'll update the date at the top, " +
          "and for anything significant we'll say so by email or on the " +
          "site.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: ["support@presetter.audio"],
    },
  ],
};

// The password-gated download page at /beta. It is not linked from the
// site, not in the sitemap, and carries a noindex tag; testers get the URL
// and the password in their invitation. `download` is printed by
// scripts/seal-beta.mjs — rerun it for each build and paste the result.
export const beta = {
  title: "Presetter beta",
  lede:
    "This page is for invited testers. Enter the password from your " +
    "invitation to download the current build.",
  passwordLabel: "Password",
  unlock: "Unlock",
  states: {
    checking: "Checking…",
    fetching: "Downloading the build…",
    decrypting: "Unlocking…",
    wrong: "That password didn't work. Check your invitation and try again.",
    failed:
      "The download didn't complete. Reload the page and try again; if " +
      "it keeps failing, email support@presetter.audio.",
  },
  ready: {
    title: "Your download is ready.",
    body: "If it didn't start on its own, use the button.",
    button: "Download",
  },
  stepsTitle: "Installing",
  steps: [
    "Open the disk image and drag Presetter into Applications.",
    "Open Presetter. If macOS asks for access to your Documents folder, " +
      "allow it — some plugins keep their presets there.",
    "Enter the license key from your invitation. It works on one Mac and " +
      "expires on the date in the invitation.",
    "Back up your Ableton User Library before building your first pack. " +
      "This is a beta.",
  ],
  afterSteps: "Then follow the five steps on the home page.",
  howToLabel: "How it works",
  howToHref: "/#how-it-works",
  agreement:
    "Downloading means you accept the license agreement, beta terms " +
    "included.",
  agreementLabel: "Read the license agreement",
  agreementHref: "/license",
  download: {
    file: "/dl/Presetter_0.2.0_universal.enc",
    name: "Presetter_0.2.0_universal.dmg",
    version: "0.2.0",
    size: 25416439,
    sha256: "1e9a58c6d3280e0159992ae6b979390031fa61a5b1278f78e4da36575ea55cea",
    iterations: 600000,
    salt: "a5Gqcj3zJMZooQSBylH01w==",
    iv: "EmC44l5D4FYQox7r",
    check: {
      iv: "29WnIkPu0Wk9yzUO",
      data: "8YhvkvjWWeB7u6pqyC3uMvHRgTxuytKCtXaTMZbw",
    },
  },
} as const;
