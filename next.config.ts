import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Keep trailing slashes to match Django URL patterns
  trailingSlash: true,
  // API proxy is handled by src/app/api/[...path]/route.ts
  // This properly forwards Set-Cookie headers for session auth
};

export default withNextIntl(nextConfig);
