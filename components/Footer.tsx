import Link from "next/link";
import {
  defaultSiteSettings,
  type SiteSettings,
} from "@/lib/site-settings-schema";
import { BrandMark, BrandText } from "./ui";

type FooterProps = {
  settings: SiteSettings;
};

function FooterLink({ href, label }: { href: string; label: string }) {
  if (!href) return <span>{label}</span>;

  if (href.startsWith("/")) {
    return <Link href={href}>{label}</Link>;
  }

  return <a href={href}>{label}</a>;
}

export function Footer({ settings }: FooterProps) {
  const content = { ...defaultSiteSettings, ...settings };
  const logoUrl = content.logoUrl?.trim() ?? "";
  const logoAlt = content.logoAlt?.trim() || "TrustLed AI";
  const columns = [
    {
      heading: content.footerServicesHeading,
      links: [
        [content.footerService1Href, content.footerService1Label],
        [content.footerService2Href, content.footerService2Label],
        [content.footerService3Href, content.footerService3Label],
      ],
    },
    {
      heading: content.footerMoreHeading,
      links: [
        [content.footerMore1Href, content.footerMore1Label],
        [content.footerMore2Href, content.footerMore2Label],
        [content.footerMore3Href, content.footerMore3Label],
        [content.footerMore4Href, content.footerMore4Label],
      ],
    },
    {
      heading: content.footerContactHeading,
      links: [
        [content.footerContact1Href, content.footerContact1Label],
        [content.footerContact2Href, content.footerContact2Label],
        [content.footerContact3Href, content.footerContact3Label],
      ],
    },
  ]
    .map((column) => ({
      ...column,
      links: column.links.filter(([, label]) => Boolean(label?.trim())),
    }))
    .filter((column) => column.links.length > 0);

  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <Link
            className={`brand brand-footer${logoUrl ? " brand-footer--logo" : ""}`}
            href="/"
            aria-label={logoAlt}
          >
            {logoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={logoUrl} alt={logoAlt} className="footer-logo" />
            ) : (
              <>
                <BrandMark />
                <BrandText />
              </>
            )}
          </Link>
          <p className="footer-line">{content.footerTagline}</p>
          <p className="footer-reg">{content.footerRegistration}</p>
        </div>

        <nav className="footer-cols" aria-label="Footer">
          {columns.map((column) => (
            <div className="footer-col" key={column.heading}>
              <h4>{column.heading}</h4>
              <ul>
                {column.links.map(([href, label]) => (
                  <li key={`${href}:${label}`}>
                    <FooterLink href={href} label={label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="wrap footer-legal">
        <p className="footer-disclaimer">{content.footerDisclaimer}</p>
      </div>

      <div className="footer-bottom">
        <div className="wrap footer-bottom-inner">
          <p>{content.footerCopyright}</p>
        </div>
      </div>
    </footer>
  );
}
