"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/constants/routes";
import { BrandMark } from "@/components/public/BrandMark";

const NAV_ITEMS = [
  { key: "about", href: ROUTES.HISTORY },
  { key: "news", href: ROUTES.NEWS },
  { key: "visit", href: ROUTES.VISIT },
  { key: "contact", href: ROUTES.CONTACT },
] as const;

const SEARCH_SUBMENU = [
  { key: "searchCotVaHinh", href: ROUTES.TIM_COT_VA_HINH },
] as const;

type LanguageCode = "vi" | "en" | "zh";

const LANGUAGES: { code: LanguageCode }[] = [
  { code: "vi" },
  { code: "en" },
  { code: "zh" },
];

function FlagUS({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" aria-hidden="true">
      <rect width="24" height="16" fill="#B22234" />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <rect
          key={i}
          y={(i * 2 + 1) * (16 / 13)}
          width="24"
          height={16 / 13}
          fill="#fff"
        />
      ))}
      <rect width="10" height={(16 / 13) * 7} fill="#3C3B6E" />
    </svg>
  );
}

function FlagVN({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" aria-hidden="true">
      <rect width="24" height="16" fill="#DA251D" />
      <polygon
        points="12,4 13,7.13 16.28,7.11 13.62,9.03 14.65,12.14 12,10.2 9.36,12.14 10.38,9.03 7.72,7.11 11,7.13"
        fill="#FFFF00"
      />
    </svg>
  );
}

function FlagCN({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" aria-hidden="true">
      <rect width="24" height="16" fill="#DE2910" />
      <polygon
        points="4,2.4 4.8,4.8 7.2,4.8 5.2,6.2 6,8.6 4,7.2 2,8.6 2.8,6.2 0.8,4.8 3.2,4.8"
        fill="#FFDE00"
      />
      <polygon
        points="9.5,2 9.9,2.9 10.9,2.9 10.1,3.5 10.4,4.4 9.5,3.8 8.6,4.4 8.9,3.5 8.1,2.9 9.1,2.9"
        fill="#FFDE00"
      />
      <polygon
        points="11.5,4.5 11.9,5.4 12.9,5.4 12.1,6 12.4,6.9 11.5,6.3 10.6,6.9 10.9,6 10.1,5.4 11.1,5.4"
        fill="#FFDE00"
      />
      <polygon
        points="11.5,7.5 11.9,8.4 12.9,8.4 12.1,9 12.4,9.9 11.5,9.3 10.6,9.9 10.9,9 10.1,8.4 11.1,8.4"
        fill="#FFDE00"
      />
      <polygon
        points="9.5,9.8 9.9,10.7 10.9,10.7 10.1,11.3 10.4,12.2 9.5,11.6 8.6,12.2 8.9,11.3 8.1,10.7 9.1,10.7"
        fill="#FFDE00"
      />
    </svg>
  );
}

const FLAG_COMPONENTS: Record<LanguageCode, typeof FlagUS> = {
  en: FlagUS,
  vi: FlagVN,
  zh: FlagCN,
};

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentLanguage = (LANGUAGES.find(lang => lang.code === i18n.language)
    ?.code ?? "vi") as LanguageCode;
  const CurrentFlag = FLAG_COMPONENTS[currentLanguage];

  const handleLanguageChange = (code: LanguageCode) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#1c0a0a]/75 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-[#c4973a]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <BrandMark className="h-16 w-16 text-[#c4973a]" />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-sm font-medium tracking-widest uppercase text-[#e8d5c4] hover:text-[#c4973a] transition-colors duration-200"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}

              <div
                className="relative"
                onMouseEnter={() => setIsSearchOpen(true)}
                onMouseLeave={() => setIsSearchOpen(false)}
              >
                <button
                  type="button"
                  className="text-sm font-medium tracking-widest uppercase text-[#e8d5c4] hover:text-[#c4973a] transition-colors duration-200 cursor-pointer"
                >
                  {t("nav.search")}
                </button>
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                    isSearchOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                >
                  <div className="min-w-[10rem] bg-[#1c0a0a]/95 backdrop-blur-xl border border-[#c4973a]/20 shadow-lg shadow-black/20">
                    {SEARCH_SUBMENU.map(item => (
                      <Link
                        key={item.key}
                        href={item.href}
                        className="block px-5 py-3 text-sm font-medium tracking-widest uppercase text-[#e8d5c4] hover:text-[#c4973a] hover:bg-[#c4973a]/10 transition-colors duration-200"
                      >
                        {t(`nav.${item.key}`)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="relative"
                onMouseEnter={() => setIsLangOpen(true)}
                onMouseLeave={() => setIsLangOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center justify-center border border-[#c4973a]/40 px-2 py-1.5 hover:bg-[#c4973a]/10 transition-colors duration-200 cursor-pointer"
                  aria-label="Change language"
                >
                  <CurrentFlag className="w-5 h-auto" />
                </button>
                <div
                  className={`absolute top-full right-0 pt-3 transition-all duration-200 ${
                    isLangOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                >
                  <div className="min-w-[8rem] bg-[#1c0a0a]/95 backdrop-blur-xl border border-[#c4973a]/20 shadow-lg shadow-black/20">
                    {LANGUAGES.map(lang => {
                      const Flag = FLAG_COMPONENTS[lang.code];
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium tracking-widest uppercase transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                            lang.code === currentLanguage
                              ? "text-[#c4973a] bg-[#c4973a]/10"
                              : "text-[#e8d5c4] hover:text-[#c4973a] hover:bg-[#c4973a]/10"
                          }`}
                        >
                          <Flag className="w-5 h-auto shrink-0" />
                          {t(`languageSwitcher.${lang.code}`)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </nav>

            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden text-[#e8d5c4]"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`md:hidden fixed inset-0 z-50 ${isMobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#1c0a0a] transition-transform duration-300 ease-in-out ${
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col p-6 gap-1">
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center gap-3"
              >
                <BrandMark className="h-16 w-16 text-[#c4973a]" />
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="text-[#e8d5c4]"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {NAV_ITEMS.map(item => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="py-4 border-b border-[#c4973a]/10 text-sm font-medium tracking-widest uppercase text-[#e8d5c4] hover:text-[#c4973a] transition-colors duration-200"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}

            <div className="border-b border-[#c4973a]/10">
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen(prev => !prev)}
                className="w-full flex items-center justify-between py-4 text-sm font-medium tracking-widest uppercase text-[#e8d5c4] hover:text-[#c4973a] transition-colors duration-200 cursor-pointer"
              >
                {t("nav.search")}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isMobileSearchOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </button>
              {isMobileSearchOpen && (
                <div className="pb-3 flex flex-col gap-1">
                  {SEARCH_SUBMENU.map(item => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="py-2 pl-4 text-sm font-medium tracking-widest uppercase text-[#e8d5c4]/70 hover:text-[#c4973a] transition-colors duration-200"
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center gap-2 self-start">
              {LANGUAGES.map(lang => {
                const Flag = FLAG_COMPONENTS[lang.code];
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleLanguageChange(lang.code)}
                    aria-label={t(`languageSwitcher.${lang.code}`)}
                    className={`flex items-center justify-center border px-2.5 py-2 transition-colors duration-200 cursor-pointer ${
                      lang.code === currentLanguage
                        ? "border-[#c4973a] bg-[#c4973a]/10"
                        : "border-[#c4973a]/40 hover:bg-[#c4973a]/10"
                    }`}
                  >
                    <Flag className="w-6 h-auto" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
