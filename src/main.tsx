import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://6d94f52ca08bf614eb1551432968a5e9@o4508691836305408.ingest.us.sentry.io/4508828203941888",
  integrations: [],
});

createRoot(document.getElementById("root")!).render(<App />);
