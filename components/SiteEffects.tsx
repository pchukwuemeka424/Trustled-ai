"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function revealInView(elements: NodeListOf<Element>) {
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("in");
    }
  });
}

export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal:not(.in)");
    if (!reveals.length) {
      return;
    }

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.01, rootMargin: "0px 0px -5% 0px" },
      );

      reveals.forEach((el) => io.observe(el));
      requestAnimationFrame(() => revealInView(reveals));

      const fallback = window.setTimeout(() => {
        reveals.forEach((el) => el.classList.add("in"));
      }, 150);

      return () => {
        io.disconnect();
        window.clearTimeout(fallback);
      };
    }

    reveals.forEach((el) => el.classList.add("in"));
  }, [pathname]);

  return null;
}
