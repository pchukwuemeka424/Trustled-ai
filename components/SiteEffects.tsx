"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function revealNow(el: Element) {
  el.classList.add("in");
}

function revealIfInView(el: Element) {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    revealNow(el);
  }
}

/**
 * Keep `.reveal` elements visible.
 *
 * React re-renders reset `className` from props (e.g. `"reveal"`), which strips
 * the `.in` class this effect adds. Without re-applying, sections stay at
 * opacity:0 — blank white blocks with only edit chrome visible.
 */
export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    let io: IntersectionObserver | null = null;
    const observed = new WeakSet<Element>();

    const observe = (el: Element) => {
      if (observed.has(el)) return;
      observed.add(el);
      io?.observe(el);
    };

    const scan = () => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        if (io) {
          // React may strip `.in` on re-render — allow re-observe.
          observed.delete(el);
          observe(el);
          revealIfInView(el);
        } else {
          revealNow(el);
        }
      });
    };

    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealNow(entry.target);
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.01, rootMargin: "0px 0px -5% 0px" },
      );
    }

    scan();
    requestAnimationFrame(scan);

    // Catch late mounts and React className resets that drop `.in`.
    const mo = new MutationObserver(() => {
      scan();
    });
    mo.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    const fallback = window.setTimeout(scan, 150);
    const fallbackLate = window.setTimeout(scan, 600);

    return () => {
      io?.disconnect();
      mo.disconnect();
      window.clearTimeout(fallback);
      window.clearTimeout(fallbackLate);
    };
  }, [pathname]);

  return null;
}
