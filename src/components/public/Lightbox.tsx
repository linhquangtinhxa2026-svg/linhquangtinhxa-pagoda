"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export interface LightboxImage {
  src: string;
  alt: string;
  type?: "image" | "video";
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;

export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const [zoom, setZoom] = useState(1);
  const isOpen = index !== null;

  const goTo = useCallback(
    (nextIndex: number) => {
      const total = images.length;
      onIndexChange(((nextIndex % total) + total) % total);
      setZoom(1);
    },
    [images.length, onIndexChange]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && index !== null) goTo(index + 1);
      if (e.key === "ArrowLeft" && index !== null) goTo(index - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, index, goTo, onClose]);

  if (!isOpen || index === null) return null;

  const current = images[index];
  const isVideo = current.type === "video";

  return (
    <div
      className="fixed inset-0 z-100 bg-[#1c0a0a]/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 flex items-center justify-center border border-[#c4973a]/40 text-[#fdf8f0] hover:border-[#c4973a] hover:text-[#c4973a] transition-colors duration-200 cursor-pointer"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {!isVideo && (
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP));
            }}
            aria-label="Zoom out"
            disabled={zoom <= MIN_ZOOM}
            className="w-11 h-11 flex items-center justify-center border border-[#c4973a]/40 text-[#fdf8f0] hover:border-[#c4973a] hover:text-[#c4973a] transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <circle cx="10" cy="10" r="7" />
              <path strokeLinecap="round" d="M21 21l-6-6M7 10h6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
            }}
            aria-label="Zoom in"
            disabled={zoom >= MAX_ZOOM}
            className="w-11 h-11 flex items-center justify-center border border-[#c4973a]/40 text-[#fdf8f0] hover:border-[#c4973a] hover:text-[#c4973a] transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <circle cx="10" cy="10" r="7" />
              <path strokeLinecap="round" d="M21 21l-6-6M10 7v6M7 10h6" />
            </svg>
          </button>
        </div>
      )}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(index - 1);
            }}
            aria-label="Previous image"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-[#c4973a]/40 text-[#fdf8f0] hover:border-[#c4973a] hover:text-[#c4973a] transition-colors duration-200 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(index + 1);
            }}
            aria-label="Next image"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-[#c4973a]/40 text-[#fdf8f0] hover:border-[#c4973a] hover:text-[#c4973a] transition-colors duration-200 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      <div className="relative w-[90vw] h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div
          className="relative w-full h-full transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        >
          {isVideo ? (
            <video
              key={current.src}
              src={current.src}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <Image src={current.src} alt={current.alt} fill sizes="90vw" className="object-contain" />
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase text-[#e8d5c4]/60">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
