"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  defaultSiteNav,
  type SiteNav,
  type SiteNavItem,
} from "@/lib/site-nav-schema";
import {
  defaultSiteSettings,
  type SiteSettings,
} from "@/lib/site-settings-schema";
import { HeaderLogoEditor } from "./header-logo-editor";
import { BrandMark, BrandText } from "./ui";

function NavChevron() {
  return (
    <svg
      className="nav-dropdown-caret"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden="true"
    >
      <path
        d="M2.5 4.5 L6 8 L9.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
      />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
      />
    </svg>
  );
}

type HeaderProps = {
  initialLogoUrl?: string;
  initialLogoAlt?: string;
  isAdmin?: boolean;
  navItems?: SiteNav;
  settings?: SiteSettings;
};

export function Header({
  initialLogoUrl = "",
  initialLogoAlt = "TrustLed AI",
  isAdmin = false,
  navItems = defaultSiteNav,
  settings = defaultSiteSettings,
}: HeaderProps) {
  const pathname = usePathname();
  const content = { ...defaultSiteSettings, ...settings };
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [logoUrl, setLogoUrl] = useState(initialLogoUrl);
  const [logoAlt, setLogoAlt] = useState(initialLogoAlt);
  const navRef = useRef<HTMLElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLeaveTimer = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  };

  const openMenu = (label: string) => {
    clearLeaveTimer();
    setOpenDropdown(label);
  };

  const scheduleClose = () => {
    clearLeaveTimer();
    leaveTimer.current = setTimeout(() => setOpenDropdown(null), 160);
  };

  useEffect(() => {
    setLogoUrl(initialLogoUrl);
    setLogoAlt(initialLogoAlt);
  }, [initialLogoUrl, initialLogoAlt]);

  useEffect(() => {
    // Hysteresis: enter/leave at different thresholds so near-threshold
    // scrolling does not thrash the scrolled class (shadow / mobile panel inset).
    const ENTER = 48;
    const LEAVE = 12;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled((prev) => {
        if (prev) return y > LEAVE;
        return y > ENTER;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    clearLeaveTimer();
  }, [pathname]);

  useEffect(() => {
    return () => clearLeaveTimer();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!openDropdown) return;
    const onPointer = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [openDropdown]);

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

  const isItemActive = (item: SiteNavItem) => {
    if (item.href === "/") return pathname === "/";
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  const isDesktop = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 761px)").matches;

  const emailLabel = content.footerContact1Label;
  const emailHref = content.footerContact1Href || `mailto:${emailLabel}`;
  const ctaLabel = content.footerContact3Label;
  const ctaHref = content.footerContact3Href || "/contact";

  return (
    <header
      className={`site-header${scrolled ? " scrolled" : ""}${menuOpen ? " menu-open" : ""}`}
      id="siteHeader"
    >
      <div className="header-topbar">
        <div className="wrap header-topbar-inner">
          <a className="header-topbar-email" href={emailHref}>
            <MailIcon />
            <span>{emailLabel}</span>
          </a>
        </div>
      </div>

      <div className="header-brandbar">
        <div className="wrap header-brandbar-inner">
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

          <div className="header-meta">
            <a className="header-meta-item" href={emailHref}>
              <span className="header-meta-icon" aria-hidden="true">
                <EnvelopeIcon />
              </span>
              <span className="header-meta-copy">
                <strong>Email us</strong>
                <span>{emailLabel}</span>
              </span>
            </a>
            <div className="header-meta-item">
              <span className="header-meta-icon" aria-hidden="true">
                <PinIcon />
              </span>
              <span className="header-meta-copy">
                <strong>Our location</strong>
                <span>Liverpool, United Kingdom</span>
              </span>
            </div>
          </div>

          <button
            className="nav-toggle"
            id="navToggle"
            aria-expanded={menuOpen}
            aria-controls="navPanel"
            onClick={() => {
              setMenuOpen((open) => !open);
              setOpenDropdown(null);
            }}
            type="button"
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="visually-hidden">Menu</span>
          </button>
        </div>
      </div>

      <div className="header-navbar">
        <div className="wrap header-navbar-inner">
          <nav className="main-nav" aria-label="Primary" ref={navRef}>
            <div
              className={`nav-backdrop${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            <div
              className={`nav-panel${menuOpen ? " open" : ""}`}
              id="navPanel"
            >
              <ul className="nav-list" id="navList">
                {navItems.map((item) => {
                  const hasChildren = Boolean(item.children?.length);
                  if (!hasChildren) {
                    return (
                      <li key={item.id} className="nav-item">
                        <Link
                          href={item.href}
                          className={`nav-link${isItemActive(item) ? " is-active" : ""}`}
                          aria-current={
                            isItemActive(item) ? "page" : undefined
                          }
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }

                  const dropdownId = `${item.id}Dropdown`;
                  const isOpen = openDropdown === item.id;
                  const active = isItemActive(item);

                  return (
                    <li
                      key={item.id}
                      className={`nav-item nav-item-dropdown${isOpen ? " open" : ""}${active ? " is-active" : ""}`}
                      onMouseEnter={() => {
                        if (isDesktop()) openMenu(item.id);
                      }}
                      onMouseLeave={() => {
                        if (isDesktop()) scheduleClose();
                      }}
                    >
                      <button
                        type="button"
                        className={`nav-dropdown-trigger${active ? " is-active" : ""}`}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        aria-controls={dropdownId}
                        aria-current={active ? "page" : undefined}
                        onClick={() => {
                          if (isDesktop()) {
                            openMenu(item.id);
                            return;
                          }
                          setOpenDropdown((current) =>
                            current === item.id ? null : item.id,
                          );
                        }}
                      >
                        <span>{item.label}</span>
                        <NavChevron />
                      </button>
                      <ul
                        className="nav-dropdown"
                        id={dropdownId}
                        hidden={!isOpen}
                      >
                        {item.children?.map((child) => (
                          <li key={child.id}>
                            {child.external ? (
                              <a
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="nav-dropdown-link"
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
                              <Link
                                href={child.href}
                                className="nav-dropdown-link"
                              >
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

              <div className="nav-cta-item">
                <Link
                  href={ctaHref}
                  className="btn btn-sm nav-cta"
                  aria-current={pathname === "/contact" ? "page" : undefined}
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
