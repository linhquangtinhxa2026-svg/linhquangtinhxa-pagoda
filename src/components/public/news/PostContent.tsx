"use client";

import { useEffect, useRef, useState } from "react";
import { Lightbox, type LightboxImage } from "@/components/public/Lightbox";

interface PostContentProps {
  html: string;
}

const EXPAND_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8 3H5a2 2 0 00-2 2v3m0 8v3a2 2 0 002 2h3m8 0h3a2 2 0 002-2v-3m0-8V5a2 2 0 00-2-2h-3"/></svg>';

export function PostContent({ html }: PostContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [media, setMedia] = useState<LightboxImage[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = Array.from(
      container.querySelectorAll<HTMLImageElement | HTMLVideoElement>("img, video")
    );

    setMedia(
      elements.map((el) => ({
        src: el instanceof HTMLVideoElement ? el.currentSrc || el.src : el.src,
        alt: el instanceof HTMLImageElement ? el.alt : "",
        type: el instanceof HTMLVideoElement ? "video" : "image",
      }))
    );

    const cleanups: Array<() => void> = [];

    elements.forEach((el, index) => {
      if (el instanceof HTMLImageElement) {
        el.style.cursor = "pointer";
        const handleClick = () => setOpenIndex(index);
        el.addEventListener("click", handleClick);
        cleanups.push(() => el.removeEventListener("click", handleClick));
        return;
      }

      if (el.dataset.lightboxEnhanced) return;
      el.dataset.lightboxEnhanced = "true";

      const wrapper = document.createElement("div");
      wrapper.className = "relative";
      el.parentNode?.insertBefore(wrapper, el);
      wrapper.appendChild(el);

      const expandButton = document.createElement("button");
      expandButton.type = "button";
      expandButton.setAttribute("aria-label", "Expand video");
      expandButton.className =
        "absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-[#1c0a0a]/70 text-[#fdf8f0] hover:bg-[#1c0a0a]/90 transition-colors duration-200 cursor-pointer";
      expandButton.innerHTML = EXPAND_ICON;
      const handleClick = (e: Event) => {
        e.stopPropagation();
        setOpenIndex(index);
      };
      expandButton.addEventListener("click", handleClick);
      wrapper.appendChild(expandButton);

      cleanups.push(() => expandButton.removeEventListener("click", handleClick));
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [html]);

  return (
    <>
      <div
        ref={containerRef}
        className="mt-8 space-y-5 prose prose-lg max-w-none text-[#2c1810]/70 [&_p]:leading-relaxed [&_a]:text-[#8b3a2e]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Lightbox
        images={media}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </>
  );
}
