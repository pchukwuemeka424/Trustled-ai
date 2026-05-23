import Link from "next/link";
import { BrandText } from "./ui";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <Link className="brand brand-footer" href="/">
            <BrandText />
          </Link>
          <p className="footer-line">Assess. Automate. Advance.</p>
          <p className="footer-reg">
            TrustLed AI Ltd is registered in England and Wales. Liverpool,
            United Kingdom.
          </p>
          <p className="footer-disclaimer">
            TrustLed AI is an advisory firm and does not provide legal advice.
          </p>
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>
                <Link href="/services#advisory">AI Governance Advisory</Link>
              </li>
              <li>
                <Link href="/services#shadow">Shadow AI Detection</Link>
              </li>
              <li>
                <Link href="/services#automation">AI Automation Services</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>More</h4>
            <ul>
              <li>
                <Link href="/solutions">ASAT</Link>
              </li>
              <li>
                <Link href="/education">Education &amp; Training</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="mailto:hello@trustledai.com">hello@trustledai.com</a>
              </li>
              <li>
                <a href="mailto:partner@trustledai.com">
                  partner@trustledai.com
                </a>
              </li>
              <li>
                <Link href="/contact">Start a conversation</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>&copy; 2026 TrustLed AI Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}
