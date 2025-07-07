import * as React from "react";
import { Toaster } from "../ui/sonner";
import QueryClient from "./query-provider";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClient>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster closeButton position="bottom-right" />
        {children}
      </ThemeProvider>
    </QueryClient>
  );
}
