import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();

const centerStyle = "flex w-screen h-screen items-center justify-center";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={
        <div className={centerStyle}>
          <p>⚠️Something went wrong</p>
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <div className={centerStyle}>
              <p>Loading...</p>
            </div>
          }
        >
          <App />
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
