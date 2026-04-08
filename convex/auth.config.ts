import { AuthConfig } from "convex/server";

const issuerDomain = process.env.CLERK_JWT_ISSUER_DOMAIN;
if (!issuerDomain) {
  throw new Error("Missing environment variable CLERK_JWT_ISSUER_DOMAIN");
}

export default {
  providers: [
    {
      domain: issuerDomain,
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
