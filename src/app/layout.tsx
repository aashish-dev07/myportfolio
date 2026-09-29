import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description =
  "Full Stack Developer with 4+ years building scalable web apps across Node.js, Express.js, React.js and MongoDB, and Laravel, PHP and MySQL — with Next.js and TypeScript throughout.";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    "Aashish Kumar", "Full Stack Developer", "MERN Stack Developer",
    "React.js", "Next.js", "Node.js", "Express.js", "MongoDB",
    "TypeScript", "Laravel", "Mohali", "India",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  openGraph: {
    type: "website",
    title: `${profile.name} — ${profile.role}`,
    description,
    siteName: `${profile.name} · Portfolio`,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05060a" },
    { media: "(prefers-color-scheme: light)", color: "#f7f8fc" },
  ],
};

/**
 * Applies the stored theme before first paint so there is no light/dark flash.
 * Kept inline and tiny on purpose — it must run ahead of hydration.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    document.documentElement.dataset.theme = stored || (prefersLight ? 'light' : 'dark');
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased`}
        style={
          {
            "--font-sans-stack": "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
            "--font-mono-stack": "var(--font-jetbrains), ui-monospace, monospace",
          } as React.CSSProperties
        }
      >
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-[var(--accent-contrast)]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
