import React, { useRef, useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "MAKE YOUR TEAM & PLAY",
    subtitle: "WIN UPTO ₹1,00,000",
    cta: "Make your team now",
    icon: "⚡",
  },
  {
    id: 2,
    title: "JOIN FANTASY CONTESTS",
    subtitle: "Big prizes waiting",
    cta: "Explore contests",
    icon: "🏆",
  },
  {
    id: 3,
    title: "WIN DAILY REWARDS",
    subtitle: "Daily login bonus",
    cta: "Claim now",
    icon: "🎁",
  },
];

export const BannerCarousel = () => {
  const ref = useRef();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function onScroll() {
      const children = Array.from(el.children);
      const center = el.scrollLeft + el.clientWidth / 2;
      let closestIndex = 0;
      let closestDist = Infinity;
      children.forEach((ch, idx) => {
        const rect = ch.getBoundingClientRect();
        const parentRect = el.getBoundingClientRect();
        const childCenter = rect.left - parentRect.left + rect.width / 2;
        const dist = Math.abs(childCenter - el.clientWidth / 2);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = idx;
        }
      });
      setActive(closestIndex);
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(idx) {
    const el = ref.current;
    if (!el) return;
    const child = el.children[idx];
    if (!child) return;
    el.scrollTo({
      left: child.offsetLeft - (el.clientWidth - child.clientWidth) / 2,
      behavior: "smooth",
    });
  }

  function next() {
    scrollTo(Math.min(active + 1, slides.length - 1));
  }
  function prev() {
    scrollTo(Math.max(active - 1, 0));
  }

  useEffect(() => {
    scrollTo(0);
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative">
        <div
          className="carousel overflow-x-auto snap-x snap-mandatory flex gap-4 px-2 py-4 scroll-smooth"
          ref={ref}
          style={{ scrollPadding: "0 1rem" }}
        >
          {slides.map((s, i) => (
            <div
              key={s.id}
              className="snap-center shrink-0 w-[86%] sm:w-[70%] md:w-[50%] transition-smooth"
            >
              <div className="relative h-40 rounded-2xl overflow-hidden group cursor-pointer shadow-glow">
                <div className="absolute inset-0 linear-primary opacity-90 group-hover:opacity-100 transition-smooth"></div>

                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-white to-transparent opacity-50"></div>

                <div className="relative h-full flex items-center justify-between p-6 text-white">
                  <div className="flex-1">
                    <div className="text-xs font-bold uppercase tracking-widest opacity-90 mb-1">
                      {s.title}
                    </div>
                    <div className="text-xl sm:text-2xl font-black mb-3 leading-tight">
                      {s.subtitle}
                    </div>
                    <button className="text-sm font-semibold bg-white hover:cursor-pointer text-primary px-4 py-2 rounded-lg hover:shadow-lg transition-smooth hover:scale-105 active:scale-95">
                      {s.cta} →
                    </button>
                  </div>

                  <div className="w-28 h-28 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center ml-4 group-hover:scale-110 group-hover:bg-white/20 transition-smooth">
                    <span className="text-5xl animate-pulse">{s.icon}</span>
                  </div>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-smooth"></div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prev}
          aria-label="prev"
          className="absolute hover:cursor-pointer left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white text-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-glow hover:scale-110 transition-smooth z-10 active:scale-95"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={next}
          aria-label="next"
          className="absolute hover:cursor-pointer right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white text-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-glow hover:scale-110 transition-smooth z-10 active:scale-95"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-center mt-6 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`rounded-full hover:cursor-pointer transition-smooth ${
              i === active
                ? "w-8 h-3 bg-linear-to-r from-primary to-accent"
                : "w-3 h-3 bg-muted hover:bg-muted-foreground"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
