import { createFileRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { EarlyAccess } from "../components/EarlyAccess";
import { Faq } from "../components/Faq";
import { Features } from "../components/Features";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { MidCta } from "../components/MidCta";
import { Origin } from "../components/Origin";
import { Positioning } from "../components/Positioning";
import { Pricing } from "../components/Pricing";
import { Rediscovery } from "../components/Rediscovery";
import { Specs } from "../components/Specs";
import { WorksWith } from "../components/WorksWith";
import { midCta } from "../content";

export const Route = createFileRoute("/")({ component: Home });

// The order is the argument: what you get, where it fits next to Live 12,
// how it works, what it does, the plugins, the specs, the price, the doubts,
// who built it, the ask.
function Home(): ReactElement {
  return (
    <>
      <Hero />
      <Positioning />
      <MidCta
        title={midCta.afterComparison.title}
        body={midCta.afterComparison.body}
      />
      <HowItWorks />
      <Features />
      <MidCta
        title={midCta.afterFeatures.title}
        body={midCta.afterFeatures.body}
      />
      <Rediscovery />
      <WorksWith />
      <Specs />
      <Pricing />
      <Faq />
      <Origin />
      <EarlyAccess />
    </>
  );
}
