import Script from "next/script";
import { CLOUDFLARE_ANALYTICS_TOKEN } from "@/lib/constants";

// Cloudflare Web Analytics: counts every visit without cookies, so it needs
// no consent. Google Analytics adds detail for visitors who accept cookies.
export default function CloudflareAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <Script
      type="module"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: CLOUDFLARE_ANALYTICS_TOKEN })}
      strategy="afterInteractive"
    />
  );
}
