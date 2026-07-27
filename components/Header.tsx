"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HeaderLogoEditor } from "./header-logo-editor";
import { BrandMark, BrandText } from "./ui";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  {
    href: "/solutions",
    label: "Solutions",
    children: [
      {
        href: "/solutions#asat",
        label: "ASAT",
        description: "AI Self-Assessment Toolkit",
      },
      {
        href: "https://garilai.com",
        label: "Garil AI",
        description: "Research platform for higher education",
        external: true,
      },
    ],
  },
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
  const [solutionsOpen, setSolutionsOpen] = useState(false);
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
    setSolutionsOpen(false);
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
            {navItems.map((item) => {
              if (!item.children) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const isSolutionsActive = pathname.startsWith("/solutions");

              return (
                <li
                  key={item.href}
                  className={`nav-item-dropdown${solutionsOpen ? " open" : ""}`}
                  onMouseEnter={() => setSolutionsOpen(true)}
                  onMouseLeave={() => setSolutionsOpen(false)}
                >
                  <button
                    type="button"
                    className="nav-dropdown-trigger"
                    aria-expanded={solutionsOpen}
                    aria-haspopup="true"
                    aria-controls="solutionsDropdown"
                    aria-current={isSolutionsActive ? "page" : undefined}
                    onClick={() => setSolutionsOpen((open) => !open)}
                  >
                    {item.label}
                    <span className="nav-dropdown-caret" aria-hidden="true" />
                  </button>
                  <ul
                    className="nav-dropdown"
                    id="solutionsDropdown"
                    hidden={!solutionsOpen}
                  >
                    {item.children.map((child) => (
                      <li key={child.href}>
                        {child.external ? (
                          <a
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="nav-dropdown-label">
                              {child.label}
                            </span>
                            {child.description ? (
                              <span className="nav-dropdown-desc">
                                {child.description}
                              </span>
                            ) : null}
                          </a>
                        ) : (
                          <Link href={child.href}>
                            <span className="nav-dropdown-label">
                              {child.label}
                            </span>
                            {child.description ? (
                              <span className="nav-dropdown-desc">
                                {child.description}
                              </span>
                            ) : null}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
