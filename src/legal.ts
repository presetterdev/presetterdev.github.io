// The license agreement and the privacy policy. They stay out of
// messages/en.yaml on purpose: each is one legal text that is revised as a
// whole and dated, and a translation would be a separate document reviewed
// on its own, not a set of strings.

// Each renders as /<slug>. Paragraphs are plain text; a section
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
