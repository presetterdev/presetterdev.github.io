// Every word on the site lives here. Components only lay it out, so a copy
// change is an edit to this file and nothing else. [Brackets] mark facts
// still to be confirmed.

import type { PresetId } from "./synth";

// Anchors carry the path so they also work from /license and /privacy.
export const nav = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Plugins", href: "/#plugins" },
  { label: "Price", href: "/#price" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const contact = {
  email: "support@presetter.audio",
  href: "mailto:support@presetter.audio",
} as const;

export const cta = {
  label: "Join the beta list",
  href: "/#beta-list",
  // Tally form id; every CTA opens it as a modal, with the anchor as fallback.
  tallyId: "gD2NoO",
  micro: "Closed beta. Mac, Live 12. Free while it's a beta.",
} as const;

export const hero = {
  // Rendered as three lines on wide screens, so the headline can be the
  // largest type on the page without an orphaned word.
  titleLines: ["Stop opening", "plugin after plugin", "to find a sound."],
  lede:
    "Presetter puts every preset from every plugin you own into Ableton " +
    "Live's browser. Filter by the kind of sound you're after, hit play to " +
    "hear it, drag it in. No plugin windows.",
  questions: "Questions:",
} as const;

export interface ReadoutFrame {
  // What Live's filters are set to, and one preset they turn up.
  tags: readonly string[];
  preset: string;
  plugin: string;
  // The pocket synth's patch that plays when the display is tapped.
  patch: PresetId;
}

// The hero graphic: the mark's dot grid grown into a hardware-style
// readout. It cycles through presets the same filter turns up in different
// plugins, which is the whole idea, and it never pretends to be a
// screenshot. Preset names are invented; plugins are real.
export const readout: {
  frames: readonly ReadoutFrame[];
  caption: string;
  label: string;
} = {
  frames: [
    {
      tags: ["PAD", "WARM"],
      preset: "ANALOG HALO",
      plugin: "PIGMENTS",
      patch: "pad",
    },
    {
      tags: ["PAD", "WARM"],
      preset: "DUST CHOIR",
      plugin: "OMNISPHERE",
      patch: "pad",
    },
    {
      tags: ["PAD", "WARM"],
      preset: "GLASS PAD",
      plugin: "SERUM 2",
      patch: "pad",
    },
    {
      tags: ["PAD", "WARM"],
      preset: "SLOW BLOOM",
      plugin: "DIVA",
      patch: "pad",
    },
    {
      tags: ["BASS", "DEEP"],
      preset: "SUB PRESSURE",
      plugin: "SERUM 2",
      patch: "bass",
    },
    {
      tags: ["BASS", "DEEP"],
      preset: "RUBBER REESE",
      plugin: "MASSIVE X",
      patch: "bass",
    },
    {
      tags: ["BASS", "DEEP"],
      preset: "TAPE SUB",
      plugin: "FM8",
      patch: "bass",
    },
    {
      tags: ["KEYS", "BRIGHT"],
      preset: "FELT PIANO",
      plugin: "KEYSCAPE",
      patch: "keys",
    },
    {
      tags: ["KEYS", "BRIGHT"],
      preset: "GLASS KEYS",
      plugin: "PIGMENTS",
      patch: "keys",
    },
    {
      tags: ["KEYS", "BRIGHT"],
      preset: "WURLI AIR",
      plugin: "KONTAKT",
      patch: "keys",
    },
    {
      tags: ["LEAD", "PLUCKED"],
      preset: "SAW PLUCK",
      plugin: "SERUM",
      patch: "lead",
    },
    {
      tags: ["LEAD", "PLUCKED"],
      preset: "NYLON LEAD",
      plugin: "HIVE",
      patch: "lead",
    },
  ],
  caption: "One filter, every plugin. Tap the display to hear a sound.",
  label: "Play the sound on the display",
};

export const whatItIs = {
  title: "What it is",
  body: [
    "You own thousands of presets and use the same forty. Finding the " +
      "rest means opening Serum, scrolling, closing it, opening Omnisphere, " +
      "scrolling, closing it, opening Kontakt and waiting.",
    "Presetter reads every preset on your Mac once and writes them into a " +
      "folder Live's browser understands. From then on you look for sounds " +
      "in Live, not in plugin windows: filter by Pad, Bass, Keys. Hit a " +
      "preset to hear it. Drag it in and the plugin opens on that sound, " +
      "ready to tweak.",
    "Nothing new to learn and nothing new to buy. It's the sounds you " +
      "already paid for, in one list.",
  ],
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
  note: string;
} = {
  title: "How it works",
  lede:
    "You run it once. It takes a while. After that you don't open it again " +
    "until you buy a new plugin.",
  steps: [
    {
      title: "Install Presetter.",
      body: "Mac, with Ableton Live 12 or newer.",
    },
    {
      title: "It finds your plugins.",
      body:
        "Presetter scans your Mac for instruments and effects. If macOS asks " +
        "for access to your Documents folder, say yes: some plugins keep " +
        "their presets there.",
    },
    {
      title: "Pick the ones you want and name the pack.",
      body: "The name is what you'll see in Live's browser.",
    },
    {
      title: "Hit generate and go make a coffee.",
      body:
        "Presetter writes every preset from those plugins into the pack " +
        "folder, with each maker's own categories carried over as Live tags " +
        "and a short preview rendered for every sound. A big collection " +
        "takes half an hour or more. Let it run.",
    },
    {
      title: "Drag the folder into Places in Live's browser.",
      body:
        "That's it. Filter, listen, drag in. When you add a plugin later, " +
        "regenerate the pack and Live picks up the changes on its own.",
    },
  ],
  note:
    "Presetter writes a new folder. Your plugins and their original presets " +
    "aren't touched.",
};

// The one honest image on the page: Live 12's browser with a pack open.
// It renders only once src/media/images/live-browser.png exists.
export const screenshot = {
  alt:
    "Ableton Live 12's browser with a Presetter pack open: tag filters on, " +
    "a preset selected, its preview playing.",
  caption: "Live 12's browser with a Presetter pack open.",
  placeholder:
    "Screenshot goes here. Save Live's browser with a pack open as " +
    "src/media/images/live-browser.png and it appears.",
} as const;

export const lean = {
  title: "Small on purpose.",
  lede:
    "A lot of music software installs a pile of stuff you didn't ask for. " +
    "Presetter is one app that writes one folder.",
  items: [
    "Not a plugin. Nothing runs inside Live and nothing runs in the " +
      "background.",
    "No account. No subscription. A license key, and that's it.",
    "Your presets stay on your Mac. Nothing is uploaded, nothing is shared.",
    "The output is one folder. Delete it and it's like Presetter was never " +
      "here.",
    "Your plugins and their original presets aren't touched.",
    "Direct download, signed and notarized for macOS.",
  ],
  specs:
    "macOS 11 or newer, Intel or Apple silicon. Ableton Live 12 or newer. " +
    "VST3 plugins, installed and licensed on the same Mac. Windows is " +
    "planned, not yet.",
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
  effectsLabel: string;
  nksTitle: string;
  nks: string;
  nksChips: readonly string[];
  request: string;
} = {
  title: "Plugins",
  intro: "Each of these has been run through Presetter and checked in Live.",
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
  effectsLabel: "Effects",
  nksTitle: "Plus anything NKS-ready.",
  nks:
    "NKS is Native Instruments' preset standard, and a couple of hundred " +
    "developers use it. If a plugin is NKS-ready, Presetter reads its " +
    "presets.",
  nksChips: [
    "u-he Diva",
    "u-he Zebra",
    "u-he Hive",
    "UVI Falcon",
    "Rob Papen",
    "Heavyocity",
    "Output",
  ],
  request:
    "Missing one? Say so on the beta form. Requests decide what gets built " +
    "next.",
};

export interface PriceLine {
  price: string;
  note: string;
}

export interface Pricing {
  title: string;
  // The number is on the page because sign-ups against a price are the
  // signal we want. Flip this off and the section still reads, minus the
  // numbers.
  showPrice: boolean;
  launch: PriceLine;
  regular: PriceLine;
  model: string;
  unpriced: string;
  beta: string;
  opinion: string;
}

export const pricing: Pricing = {
  title: "Price",
  showPrice: true,
  launch: { price: "$79", note: "if you're on the beta list." },
  regular: { price: "$149", note: "after launch." },
  model: "One-time purchase. No subscription.",
  unpriced:
    "We haven't locked the number. The beta decides it, so if you have an " +
    "opinion about what this should cost, we want it: say so on the form, " +
    "or email us.",
  beta:
    "Free while it's a beta. Beta testers get the launch price when it " +
    "ships.",
  opinion:
    "Think that's wrong, either way? Say so on the form or email us. We're " +
    "two people and we read everything.",
};

export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: { title: string; items: readonly FaqItem[] } = {
  title: "FAQ",
  items: [
    {
      question: "Does it copy or share presets?",
      answer:
        "No. It reads preset files already on your Mac and writes them into " +
        "a folder on the same Mac. Previews are rendered from your own " +
        "licensed plugins. Nothing is uploaded and nothing is redistributed.",
    },
    {
      question: "Do I still need the plugins?",
      answer:
        "Yes. A preset is a list of settings; the plugin makes the sound. " +
        "Presets for a plugin you don't have won't load.",
    },
    {
      question: "Where do the tags come from?",
      answer:
        "From the plugin makers. Serum says Pads, Omnisphere says Pads + " +
        "Strings, Kontakt says Synth Pad. Presetter reads each maker's " +
        "categories and maps them onto Live 12's tags, so everything " +
        "filters the same way.",
    },
    {
      question: "What happens when I load one?",
      answer:
        "The plugin loads in your device chain with the preset selected and " +
        "its macros mapped. Tweak it from Live, or open the plugin if you " +
        "want to go deeper.",
    },
    {
      question: "Is it a plugin? Will it slow Live down?",
      answer:
        "No and no. It's a standalone Mac app you run to build or update " +
        "the pack. Nothing runs inside Live.",
    },
    {
      question: "Which versions of Live?",
      answer:
        "Live 12 and newer. The tag filtering uses browser features that " +
        "arrived in 12.",
    },
    {
      question: "Windows?",
      answer: "Not yet. It's planned. Get on the list and we'll tell you.",
    },
    {
      question: "Effects too?",
      answer:
        "Yes. Effect presets get indexed, tagged and previewed like " +
        "instruments.",
    },
    {
      question: "My plugin isn't on the list.",
      answer:
        "If it's NKS-ready, it works. If it isn't, tell us on the form. " +
        "Requests set the order we build in.",
    },
    {
      question: "What if a plugin changes its preset format?",
      answer:
        "Run Presetter again. We keep the adapters current as vendors " +
        "change things, and a license includes updates for a year.",
    },
    {
      question: "Do I need Komplete Kontrol or other NI software?",
      answer: "No. Presetter reads the preset files directly.",
    },
    {
      question: "How does the beta work?",
      answer:
        "It's running now, Mac only, closed. We pick testers from the list " +
        "to cover different plugin collections, so say what you own. Beta " +
        "builds come with a free license key that expires when the beta " +
        "ends.",
    },
    {
      question: "Refunds?",
      answer:
        "All sales are final. The pack stays on your Mac whether or not " +
        "the app does, so there's nothing to give back. Check the plugin " +
        "list before you buy.",
    },
  ],
};

export const origin = {
  title: "Why this exists",
  body: [
    "Because one of us got sick of it.",
    "Late nights, same routine. Open a plugin, scroll through its presets, " +
      "close it, open the next one, forget what the good one was called. " +
      "Thousands of sounds, all paid for, and the only way to hear any of " +
      "them was one window at a time. Live's browser had tags and previews " +
      "for Ableton's own sounds and nothing for anyone else's.",
    "So he went looking for something that fixed it. Nothing did. He " +
      "started hacking on it, got carried away, and at some point it " +
      "stopped being a hack and became the way he finds sounds. That's " +
      "Presetter.",
    "It's in closed beta now with producers in the US and Germany. If " +
      "something's broken, or there's a plugin that belongs on the list, " +
      "email us.",
  ],
} as const;

export const betaList = {
  title: "Join the beta list",
  body:
    "Leave an email and the plugins you own. We pick testers by plugin " +
    "collection, so be specific. Mac and Live 12 only for now, and free " +
    "while it's a beta.",
  orEmail: "Or just email us:",
} as const;

export const footer = {
  links: [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Plugins", href: "/#plugins" },
    { label: "Price", href: "/#price" },
    { label: "FAQ", href: "/#faq" },
    { label: "Beta list", href: "/#beta-list" },
    { label: "License", href: "/license" },
    { label: "Privacy", href: "/privacy" },
  ],
  copyright: "© 2026 Presetter",
  disclaimer:
    "Presetter is independent software. All manufacturer and product names " +
    "mentioned on this site are trademarks of their respective owners, which " +
    "are in no way associated or affiliated with Presetter. They are used " +
    "solely to identify the products Presetter works with and do not suggest " +
    "affiliation, sponsorship, or endorsement.",
  // The second hint to the hidden synth, after the not-found page.
  hint: "Press P.",
} as const;

// The page an unknown address lands on. Pages serves it for any path that
// has no file, so it is prerendered to 404.html.
export const notFound = {
  title: "There's nothing here.",
  body: "That address doesn't exist. The home page has everything that does.",
  // The only hint to the hidden synth on the site; the action opens it, so
  // phones without a P key get there too.
  hint: "Well, almost.",
  hintAction: "Press P.",
  cta: "Go to the home page",
  href: "/",
} as const;

// The hidden synth. Pressing P on any page opens it; nothing on the site
// points to it except the not-found page.
export const pocketSynth = {
  title: "You found the synth.",
  lede:
    "The mark is a grid of dots. Each dot is a step: columns are time, rows " +
    "are notes, and the P is the first riff.",
  presetLabel: "Preset",
  presets: [
    { id: "pad", label: "Warm Pad" },
    { id: "keys", label: "Glass Keys" },
    { id: "bass", label: "Sub Bass" },
    { id: "lead", label: "Saw Lead" },
  ],
  play: "Play",
  stop: "Stop",
  reset: "Reset to P",
  clear: "Clear",
  tempo: "Tempo",
  scale: "C minor pentatonic, C4 at the bottom",
  size: "16 steps · 7 notes",
  keysTitle: "Play over it",
  keysHelp: "A to K are the white notes, W E T Y U the black ones. Or tap.",
  dismiss: "Esc closes it. P brings it back.",
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

// The licensor as named on the legal pages. Pre-incorporation this is the
// product name alone; becomes the entity's legal name once it exists.
export const legalEntity = "Presetter";

export const license: LegalDoc = {
  slug: "license",
  title: "Presetter License Agreement",
  updated: "October 13, 2026",
  intro: [
    "This agreement is between " +
      legalEntity +
      ' ("we") and you. It covers the Presetter application for macOS, ' +
      "including pre-release (beta) builds, updates, and documentation " +
      '(together, the "Software").',
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
          "the version of the Software you're licensed for, on one Mac " +
          "you own or control, for your own music production. Anything " +
          "beyond that — a second machine, a studio, an organization — " +
          "needs a separate license from us.",
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
          "identifier for your Mac, the app version, and a crash " +
          "report if the Software fails — is described in the " +
          "Presetter Privacy Policy, which is part of this agreement.",
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
        "We collect an email address if you give us one, a license-key " +
          "check when the app runs, and a crash report if it fails.",
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
          "license work on your Mac and not on everyone else's.",
        "If the app hits an error, it sends a crash report to Sentry, " +
          "our error-tracking service: what went wrong, where in the " +
          "app, and your macOS and app versions. Reports don't include " +
          "your preset files or their contents. [Confirm with Kevin " +
          "exactly what the Sentry client attaches — breadcrumbs, " +
          "device fields, any user fields — and whether PII defaults " +
          "are off.]",
        "The app doesn't send usage statistics. If we add them, they " +
          "will be opt-in, and this policy will describe them.",
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
        "Sentry — crash reports from the app.",
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
// and the password in their invitation.
//
// The build itself is a GitHub release asset. For a new build, change
// `url`, `name` and `version` to the release's, and `size` and `sha256` to
// the file's (`shasum -a 256 Presetter.dmg`); the page shows them so a
// tester can check what they got. `salt`, `iterations` and `check` prove
// the password and are printed by scripts/beta-password.ts — rerun it only
// when the password changes.
export const beta = {
  title: "Presetter beta",
  lede:
    "This page is for invited testers. Enter the password from your " +
    "invitation to download the current build.",
  passwordLabel: "Password",
  unlock: "Unlock",
  states: {
    checking: "Checking…",
    wrong: "That password didn't work. Check your invitation and try again.",
    failed:
      "Something went wrong. Reload the page and try again; if it keeps " +
      "failing, email support@presetter.audio.",
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
    url: "https://github.com/presetterdev/presetter-releases/releases/download/v0.3.0-alpha.2/Presetter.dmg",
    name: "Presetter.dmg",
    version: "0.3.0-alpha.2",
    size: 24137177,
    sha256: "bb179618390a420fb25b247200170e0b4d93b518b7d77d6a39bff5c09b9f9397",
    iterations: 600000,
    salt: "NJmbXObHHhb/8a1d5TLplw==",
    check: {
      iv: "PQNbNTc3AfMiumB/",
      data: "74NepbRxEt40/V2aS/mGSTVsdj05KKo96JzvFh1j",
    },
  },
} as const;
