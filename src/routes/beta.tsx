import { createFileRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { BetaDownload } from "../components/BetaDownload";

export const Route = createFileRoute("/beta")({ component: Beta });

// The password-gated download for invited testers. Unlinked, unlisted in
// the sitemap, and noindexed by the prerender.
function Beta(): ReactElement {
  return <BetaDownload />;
}
