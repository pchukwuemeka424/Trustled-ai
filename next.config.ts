import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/solutions.html", destination: "/solutions", permanent: true },
      { source: "/education.html", destination: "/education", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/thank-you.html", destination: "/thank-you", permanent: true },
    ];
  },
};

export default nextConfig;
