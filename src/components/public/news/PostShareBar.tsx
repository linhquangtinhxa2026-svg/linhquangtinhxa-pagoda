"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

interface PostShareBarProps {
  shareUrl: string;
}

const FACEBOOK_ICON_PATH =
  "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z";

const LINK_ICON_PATH =
  "M10.5 13.5l3-3m-5.5 5.5l-1.5 1.5a3.5 3.5 0 01-5-5l3-3a3.5 3.5 0 015 0m3 0l1.5-1.5a3.5 3.5 0 015 5l-3 3a3.5 3.5 0 01-5 0";

const CHECK_ICON_PATH = "M5 13l4 4L19 7";

const iconButtonClass =
  "w-9 h-9 rounded-full border border-[#c4973a]/30 text-[#c4973a]/60 hover:text-[#c4973a] hover:border-[#c4973a] transition-colors duration-200 flex items-center justify-center cursor-pointer";

const facebookButtonClass =
  "w-9 h-9 rounded-full border border-[#1877F2]/30 text-[#1877F2]/70 hover:text-[#1877F2] hover:border-[#1877F2] transition-colors duration-200 flex items-center justify-center cursor-pointer";

export function PostShareBar({ shareUrl }: PostShareBarProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-10 pt-6 border-t border-[#c4973a]/15 flex items-center gap-4">
      <span className="text-xs tracking-[0.3em] uppercase font-semibold text-[#2c1810]/40">
        {t("newsPage.share")}
      </span>
      <a
        href={facebookShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("newsPage.shareFacebook")}
        className={facebookButtonClass}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d={FACEBOOK_ICON_PATH} />
        </svg>
      </a>
      <button
        type="button"
        onClick={handleCopyLink}
        aria-label={t("newsPage.copyLink")}
        className={iconButtonClass}
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={copied ? CHECK_ICON_PATH : LINK_ICON_PATH}
          />
        </svg>
      </button>
      {copied && (
        <span className="text-xs font-medium text-[#c4973a]">
          {t("newsPage.linkCopied")}
        </span>
      )}
    </div>
  );
}
