import { createFileRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { BetaList } from "../components/BetaList";
import { Faq } from "../components/Faq";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { Lean } from "../components/Lean";
import { Origin } from "../components/Origin";
import { Pricing } from "../components/Pricing";
import { WhatItIs } from "../components/WhatItIs";
import { WorksWith } from "../components/WorksWith";

export const Route = createFileRoute("/")({ component: Home });

// The order is the argument: the one line, what it is, how you use it,
// what it stays out of, whether your plugins are covered, what it costs,
// the doubts, why it exists, the ask.
function Home(): ReactElement {
  return (
    <>
      <Hero />
      <WhatItIs />
      <HowItWorks />
      <Lean />
      <WorksWith />
      <Pricing />
      <Faq />
      <Origin />
      <BetaList />
    </>
  );
}
