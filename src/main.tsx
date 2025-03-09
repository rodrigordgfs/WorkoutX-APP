import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MenuProvider } from "./context/MenuContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { ToastContainer } from "react-toastify";
import { WorkoutProvider } from "./context/WorkoutContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { DashboardProvider } from "./context/DashboardContext.tsx";
import * as Sentry from "@sentry/react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Clerk - Missing Publishable Key");
}

Sentry.init({
  dsn: import.meta.env.VITE_DNS_SENTRY,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/workout-x\.vercel.app\/api/,
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <UserProvider>
          <MenuProvider>
            <WorkoutProvider>
              <DashboardProvider>
                <App />
              </DashboardProvider>
            </WorkoutProvider>
          </MenuProvider>
        </UserProvider>
      </ClerkProvider>
    </BrowserRouter>
    <ToastContainer />
  </StrictMode>
);
