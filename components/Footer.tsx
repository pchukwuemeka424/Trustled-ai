import Link from "next/link";
import {
  defaultSiteSettings,
  type SiteSettings,
} from "@/lib/site-settings-schema";
import { BrandText } from "./ui";

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
  ];

  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <Link className="brand brand-footer" href="/">
            <BrandText />
          </Link>
          <p className="footer-line">{content.footerTagline}</p>
          <p className="footer-reg">{content.footerRegistration}</p>
          <p className="footer-disclaimer">{content.footerDisclaimer}</p>
        </div>
        <div className="footer-cols">
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
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>{content.footerCopyright}</p>
      </div>
    </footer>
  );
}
