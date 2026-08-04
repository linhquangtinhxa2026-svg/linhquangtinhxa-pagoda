interface TimCotVaHinhSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}

export function TimCotVaHinhSearchBar({
  value,
  onChange,
  placeholder,
  label,
}: TimCotVaHinhSearchBarProps) {
  return (
    <div className="flex flex-col gap-4">
      <label
        htmlFor="tim-cot-va-hinh-search"
        className="text-[11px] tracking-[0.4em] uppercase font-bold text-[#c4973a]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {label}
      </label>

      <div className="relative w-full group">
        <div className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-[#c4973a] transition-transform duration-300 group-focus-within:scale-110">
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <input
          id="tim-cot-va-hinh-search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white border border-[#c4973a]/30 text-[#1c0a0a] text-base sm:text-lg md:text-xl pl-12 pr-6 py-4 placeholder:text-[#1c0a0a]/30 focus:outline-none focus:border-[#c4973a] focus:ring-1 focus:ring-[#c4973a] transition-all duration-200 shadow-[0_2px_10px_-4px_rgba(28,10,10,0.05)]"
          style={{ fontFamily: "var(--font-sans)" }}
        />
      </div>
    </div>
  );
}
