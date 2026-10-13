import { createFileRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { LegalPage } from "../components/LegalPage";
import { privacy } from "../content";

export const Route = createFileRoute("/privacy")({ component: Privacy });

// The privacy policy. Linked from the footer and the license agreement.
function Privacy(): ReactElement {
  return <LegalPage doc={privacy} />;
}
