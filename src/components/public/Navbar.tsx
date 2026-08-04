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

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi");
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

              <button
                type="button"
                onClick={toggleLanguage}
                className="text-sm font-medium tracking-widest uppercase text-[#c4973a] border border-[#c4973a]/40 px-3 py-1.5 hover:bg-[#c4973a]/10 transition-colors duration-200 cursor-pointer"
              >
                {i18n.language === "vi" ? "EN" : "VI"}
              </button>
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

            <button
              type="button"
              onClick={toggleLanguage}
              className="mt-6 text-sm font-medium tracking-widest uppercase text-[#c4973a] border border-[#c4973a]/40 px-3 py-2 hover:bg-[#c4973a]/10 transition-colors duration-200 cursor-pointer self-start"
            >
              {i18n.language === "vi" ? "English" : "Tiếng Việt"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
