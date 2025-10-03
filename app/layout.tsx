import "@/styles/globals.css";
import type { Metadata } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  title: "Aichiow Plus",
  description: "Anime, manga, manhwa, light novel platform",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  other: {
    "google-site-verification": "yFNWP1UDhvOSuM_tCxDQd_pzebb7ZhMEeYxGJj6Alok",
  },
};

function Providers({ children }: { children: ReactNode }) {
  // QueryClient harus stateful agar persist
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const isLanding = pathname === "/";
  const isMaintenance = pathname === "/maintenance";

  return (
    <html lang="en">
      <body>
        <Providers>
          {!isLanding && !isMaintenance && <Navbar />}
          <main className="md:pb-0 pb-[calc(var(--bottom-nav,72px)+env(safe-area-inset-bottom))]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
