import { createFileRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { BetaList } from "../components/BetaList";
import { Faq } from "../components/Faq";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { Lean } from "../components/Lean";
import { Origin } from "../components/Origin";
import { Pricing } from "../components/Pricing";
import { WorksWith } from "../components/WorksWith";

export const Route = createFileRoute("/")({ component: Home });

// The order is the argument: the one line, what it sounds like, how you use
// it, whether your plugins are covered, what it stays out of, why it exists,
// what it costs, the ask, the doubts.
function Home(): ReactElement {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WorksWith />
      <Lean />
      <Origin />
      <Pricing />
      <BetaList />
      <Faq />
    </>
  );
}
