// What the site is made of besides its words: links, lists and their order,
// plugin names, prices and the beta build. The words themselves are in
// messages/en.yaml; entries here point at them by message.

import { m } from "./paraglide/messages.js";
import type { Category, SoundId } from "./synth";

// A message with no inputs, called when the page renders.
type Words = () => string;

interface Link {
  label: Words;
  href: string;
}

// Anchors carry the path so they also work from /license and /privacy.
export const nav: readonly Link[] = [
  { label: m.nav_how_it_works, href: "/#how-it-works" },
  { label: m.nav_plugins, href: "/#plugins" },
  { label: m.nav_price, href: "/#price" },
  { label: m.nav_faq, href: "/#faq" },
];

export const footerLinks: readonly Link[] = [
  ...nav,
  { label: m.nav_waitlist, href: "/#waitlist" },
  { label: m.nav_license, href: "/license" },
  { label: m.nav_privacy, href: "/privacy" },
];

export const contact = {
  email: "support@presetter.audio",
  href: "mailto:support@presetter.audio",
} as const;

export const cta = {
  href: "/#waitlist",
  // Tally form id; every CTA opens it as a modal, with the anchor as fallback.
  tallyId: "gD2NoO",
} as const;

export interface CategoryLabel {
  id: Category;
  label: Words;
}

// The kinds of sound, in the order the library's filter shows them.
export const categories: readonly CategoryLabel[] = [
  { id: "bass", label: m.categories_bass },
  { id: "keys", label: m.categories_keys },
  { id: "pad", label: m.categories_pad },
  { id: "lead", label: m.categories_lead },
];

export type Character = "bright" | "dark" | "warm" | "soft";

export interface CharacterLabel {
  id: Character;
  label: Words;
}

// The second filter, after Live's Character tags. A plugin's maker would be
// the obvious one, but it reads as the maker having made these sounds.
export const characters: readonly CharacterLabel[] = [
  { id: "bright", label: m.characters_bright },
  { id: "dark", label: m.characters_dark },
  { id: "warm", label: m.characters_warm },
  { id: "soft", label: m.characters_soft },
];

export interface LibrarySound {
  id: SoundId;
  plugin: string;
  character: Character;
  category: Category;
  tags: Words;
}

// The library beside the headline, in list order. The sounds are the site's
// own synth patches labelled with the plugin they stand in for, so the page
// shows no one's real preset names and plays no one's real sound.
export const librarySounds: readonly LibrarySound[] = [
  {
    id: "diva-lead",
    plugin: "Diva",
    character: "warm",
    category: "lead",
    tags: m.library_tags_diva_lead,
  },
  {
    id: "omnisphere-pad",
    plugin: "Omnisphere",
    character: "soft",
    category: "pad",
    tags: m.library_tags_omnisphere_pad,
  },
  {
    id: "serum2-bass",
    plugin: "Serum 2",
    character: "dark",
    category: "bass",
    tags: m.library_tags_serum2_bass,
  },
  {
    id: "keyscape-keys",
    plugin: "Keyscape",
    character: "warm",
    category: "keys",
    tags: m.library_tags_keyscape_keys,
  },
  {
    id: "pigments-pad",
    plugin: "Pigments",
    character: "bright",
    category: "pad",
    tags: m.library_tags_pigments_pad,
  },
  {
    id: "massivex-bass",
    plugin: "Massive X",
    character: "dark",
    category: "bass",
    tags: m.library_tags_massivex_bass,
  },
  {
    id: "serum-lead",
    plugin: "Serum",
    character: "bright",
    category: "lead",
    tags: m.library_tags_serum_lead,
  },
  {
    id: "kontakt-keys",
    plugin: "Kontakt",
    character: "soft",
    category: "keys",
    tags: m.library_tags_kontakt_keys,
  },
];

export interface Feature {
  title: Words;
  body: Words;
  // Which sound category's colour the bullet takes.
  category: Category;
}

export const features: readonly Feature[] = [
  {
    title: m.how_features_sorted_title,
    body: m.how_features_sorted_body,
    category: "bass",
  },
  {
    title: m.how_features_preview_title,
    body: m.how_features_preview_body,
    category: "keys",
  },
  {
    title: m.how_features_no_window_title,
    body: m.how_features_no_window_body,
    category: "pad",
  },
  {
    title: m.how_features_per_maker_title,
    body: m.how_features_per_maker_body,
    category: "lead",
  },
];

// The literal sequence a new user follows, in order. Change them only when
// the app changes.
export const setupSteps: readonly Words[] = [
  m.how_setup_pick,
  m.how_setup_build,
  m.how_setup_drag,
];

export const leanPoints: readonly Words[] = [
  m.lean_points_not_plugin,
  m.lean_points_no_account,
  m.lean_points_no_background,
  m.lean_points_one_folder,
];

export interface Vendor {
  name: string;
  plugins: readonly string[];
  effects?: readonly string[];
}

// Each of these has been run through Presetter and checked in Live.
export const vendors: readonly Vendor[] = [
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
];

export const nksExamples: readonly string[] = [
  "u-he Diva",
  "u-he Zebra",
  "u-he Hive",
  "UVI Falcon",
  "Rob Papen",
  "Heavyocity",
  "Output",
];

export interface PriceLine {
  // US dollars.
  amount: number;
  note: Words;
}

export const pricing: {
  // The number is on the page because sign-ups against a price are the
  // signal we want. Flip this off and the section still reads, minus the
  // numbers.
  showPrice: boolean;
  launch: PriceLine;
  regular: PriceLine;
} = {
  showPrice: true,
  launch: { amount: 79, note: m.pricing_launch },
  regular: { amount: 149, note: m.pricing_regular },
};

export interface FaqItem {
  question: Words;
  answer: Words;
}

export const faq: readonly FaqItem[] = [
  { question: m.faq_copy_question, answer: m.faq_copy_answer },
  {
    question: m.faq_plugins_needed_question,
    answer: m.faq_plugins_needed_answer,
  },
  { question: m.faq_tags_question, answer: m.faq_tags_answer },
  { question: m.faq_load_question, answer: m.faq_load_answer },
  { question: m.faq_plugin_question, answer: m.faq_plugin_answer },
  { question: m.faq_live_question, answer: m.faq_live_answer },
  { question: m.faq_windows_question, answer: m.faq_windows_answer },
  { question: m.faq_effects_question, answer: m.faq_effects_answer },
  { question: m.faq_missing_question, answer: m.faq_missing_answer },
  { question: m.faq_format_question, answer: m.faq_format_answer },
  { question: m.faq_ni_question, answer: m.faq_ni_answer },
  { question: m.faq_beta_question, answer: m.faq_beta_answer },
  { question: m.faq_refunds_question, answer: m.faq_refunds_answer },
];

// The password-gated download page at /beta. It is not linked from the
// site, not in the sitemap, and carries a noindex tag; testers get the URL
// and the password in their invitation.
export const betaSteps: readonly Words[] = [
  m.beta_install_disk_image,
  m.beta_install_documents,
  m.beta_install_key,
  m.beta_install_backup,
];

// Printed by scripts/seal-beta.ts: rerun it for each build and paste the
// result.
export const betaDownload = {
  file: "/dl/Presetter_0.2.0_universal.enc",
  name: "Presetter_0.2.0_universal.dmg",
  version: "0.2.0",
  size: 25416439,
  sha256: "1e9a58c6d3280e0159992ae6b979390031fa61a5b1278f78e4da36575ea55cea",
  iterations: 600000,
  salt: "NJmbXObHHhb/8a1d5TLplw==",
  iv: "uuYBo5mnQgqPMNZb",
  check: {
    iv: "PQNbNTc3AfMiumB/",
    data: "74NepbRxEt40/V2aS/mGSTVsdj05KKo96JzvFh1j",
  },
} as const;
