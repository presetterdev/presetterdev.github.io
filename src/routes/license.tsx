import { createFileRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { LegalPage } from "../components/LegalPage";
import { license } from "../legal";

export const Route = createFileRoute("/license")({ component: License });

// The license agreement, beta terms included. Linked from the footer, the
// tester email, and the app.
function License(): ReactElement {
  return <LegalPage doc={license} />;
}
