"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HeaderLogoEditor } from "./header-logo-editor";
import { BrandMark, BrandText } from "./ui";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/education", label: "Education & Training" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

type HeaderProps = {
  initialLogoUrl?: string;
  initialLogoAlt?: string;
  isAdmin?: boolean;
};

export function Header({
  initialLogoUrl = "",
  initialLogoAlt = "TrustLed AI",
  isAdmin = false,
}: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoUrl, setLogoUrl] = useState(initialLogoUrl);
  const [logoAlt, setLogoAlt] = useState(initialLogoAlt);

  useEffect(() => {
    setLogoUrl(initialLogoUrl);
    setLogoAlt(initialLogoAlt);
  }, [initialLogoUrl, initialLogoAlt]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const saveLogo = useCallback(async (nextUrl: string, nextAlt: string) => {
    const response = await fetch("/api/admin/site-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        logoUrl: nextUrl,
        logoAlt: nextAlt,
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      throw new Error(data.error ?? "Failed to save logo");
    }

    const data = (await response.json()) as {
      settings?: { logoUrl?: string; logoAlt?: string };
    };

    setLogoUrl(data.settings?.logoUrl ?? nextUrl);
    setLogoAlt(data.settings?.logoAlt ?? nextAlt);
  }, []);

  return (
    <header
      className={`site-header${scrolled ? " scrolled" : ""}`}
      id="siteHeader"
    >
      <div className="wrap header-inner">
        <div className="brand-wrap">
          <Link
            className="brand"
            href="/"
            aria-label={logoAlt || "TrustLed AI home"}
          >
            {logoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={logoUrl} alt={logoAlt} className="brand-logo" />
            ) : (
              <>
                <BrandMark />
                <BrandText />
              </>
            )}
          </Link>
          {isAdmin ? (
            <HeaderLogoEditor
              logoUrl={logoUrl}
              logoAlt={logoAlt}
              onSave={saveLogo}
            />
          ) : null}
        </div>
        <nav className="main-nav" aria-label="Primary">
          <button
            className="nav-toggle"
            id="navToggle"
            aria-expanded={menuOpen}
            aria-controls="navList"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="visually-hidden">Menu</span>
          </button>
          <ul className={`nav-list${menuOpen ? " open" : ""}`} id="navList">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
