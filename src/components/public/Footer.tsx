"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { PAGODA_INFO } from "@/data/publicData";
import { ROUTES } from "@/constants/routes";
import { BrandMark } from "@/components/public/BrandMark";

const QUICK_LINKS = [
  { key: "about", href: ROUTES.HISTORY },
  { key: "news", href: ROUTES.NEWS },
  { key: "visit", href: ROUTES.VISIT },
  { key: "contact", href: ROUTES.CONTACT },
] as const;

const SOCIAL_ICONS = [
  {
    key: "facebook",
    path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  },
  {
    key: "youtube",
    path: "M22 8.5s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C16.4 5.3 12 5.3 12 5.3s-4.4 0-7.1.2c-.4 0-1.3.1-2.1.9C2.2 7 2 8.5 2 8.5S1.8 10.2 1.8 12v1.9c0 1.8.2 3.5.2 3.5s.2 1.5.8 2.1c.8.8 1.9.8 2.4.9 1.7.2 7 .2 7 .2s4.4 0 7.1-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.7.2-3.5V12c0-1.8-.2-3.5-.2-3.5zM9.9 15.3V9.4l5.6 3-5.6 2.9z",
  },
] as const;

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f0505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <BrandMark className="h-16 w-16 text-[#c4973a]" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#e8d5c4]/50">
              {t("footer.description")}
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_ICONS.map(icon => (
                <a
                  key={icon.key}
                  href="#"
                  className="w-9 h-9 rounded-full border border-[#c4973a]/30 text-[#c4973a]/60 hover:text-[#c4973a] hover:border-[#c4973a] transition-colors duration-200 flex items-center justify-center"
                  aria-label={icon.key}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase font-semibold text-[#c4973a]">
              {t("footer.quickLinks")}
            </h4>
            <ul className="mt-4 space-y-3">
              {QUICK_LINKS.map(link => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#e8d5c4]/50 hover:text-[#c4973a] transition-colors duration-200"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase font-semibold text-[#c4973a]">
              {t("footer.contact")}
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-[#e8d5c4]/50">
              <li>{PAGODA_INFO.address}</li>
              <li>{PAGODA_INFO.phone}</li>
              <li>{PAGODA_INFO.email}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase font-semibold text-[#c4973a]">
              {t("footer.followUs")}
            </h4>
            <p className="mt-4 text-sm text-[#e8d5c4]/50">{t("visit.hours")}</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#c4973a]/10">
          <p className="text-xs text-[#e8d5c4]/30">
            {t("footer.copyright", { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
