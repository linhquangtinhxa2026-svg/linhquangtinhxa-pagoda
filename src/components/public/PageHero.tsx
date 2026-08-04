import Image from "next/image";

interface PageHeroProps {
  image: string;
  eyebrow: string;
  title: string;
  titleEmphasis?: string;
  subtitle?: string;
}

export function PageHero({
  image,
  eyebrow,
  title,
  titleEmphasis,
  subtitle,
}: PageHeroProps) {
  return (
    <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4973a] to-transparent z-10" />

      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        // style={{
        //   objectPosition: "0 -100vw",
        // }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c0a0a]/80 via-[#1c0a0a]/65 to-[#1c0a0a]/90" />

      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <span className="text-xs sm:text-sm tracking-[0.4em] uppercase font-medium text-[#c4973a] mb-4">
          {eyebrow}
        </span>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-[#fdf8f0]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}{" "}
          {titleEmphasis && (
            <span className="text-[#c4973a] italic">{titleEmphasis}</span>
          )}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#e8d5c4]/70 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4973a] to-transparent z-10" />
    </section>
  );
}
