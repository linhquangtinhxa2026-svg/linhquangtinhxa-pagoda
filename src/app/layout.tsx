import type { Metadata } from "next";
import { Cormorant, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/lib/providers";

const cormorant = Cormorant({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://linhquangtinhxa.org";
const DEFAULT_OG_IMAGE = "/images/home/hero-bg-2.jpg";
const DEFAULT_DESCRIPTION =
  "Linh Quang Tịnh Xá - chốn thanh tịnh tu học Phật pháp tại Quận 4, TP. Hồ Chí Minh, thành lập năm 1953.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Linh Quang Tịnh Xá",
    template: "%s | Linh Quang Tịnh Xá",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Linh Quang Tịnh Xá",
    "Tịnh Xá Linh Quang",
    "chùa Quận 4",
    "tu học Phật pháp",
    "Phật giáo",
    "tịnh xá",
    "TP. Hồ Chí Minh",
  ],
  openGraph: {
    title: "Linh Quang Tịnh Xá",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: "Linh Quang Tịnh Xá",
    images: [{ url: DEFAULT_OG_IMAGE }],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linh Quang Tịnh Xá",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${cormorant.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-sans)" }}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
