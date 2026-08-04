"use client";

import { useTranslation } from "react-i18next";
import { PAGODA_INFO } from "@/data/publicData";
import { ContactForm } from "@/components/public/contact/ContactForm";

export function ContactSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-[#1c0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a]">
              {t("contact.eyebrow")}
            </span>
            <h2
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#fdf8f0]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t("contact.title")}{" "}
              <span className="text-[#c4973a] italic">{t("contact.titleEmphasis")}</span>
            </h2>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-xs tracking-widest uppercase font-semibold text-[#c4973a]">
                  {t("visit.addressLabel")}
                </p>
                <p className="mt-1 text-base sm:text-lg text-[#e8d5c4]/70">{PAGODA_INFO.address}</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase font-semibold text-[#c4973a]">
                  {t("visit.hoursLabel")}
                </p>
                <p className="mt-1 text-base sm:text-lg text-[#e8d5c4]/70">{t("visit.hours")}</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase font-semibold text-[#c4973a]">
                  {t("visit.contactLabel")}
                </p>
                <p className="mt-1 text-base sm:text-lg text-[#e8d5c4]/70">{PAGODA_INFO.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#2c1810]/30 p-6 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
