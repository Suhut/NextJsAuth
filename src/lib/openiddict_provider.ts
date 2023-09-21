import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth"

export interface OpeniddictISUser extends Record<string, any> {
  email: string
  id: string
  name: string
  verified: boolean
}

export default function OpeniddictIdentityServer<P extends OpeniddictISUser>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "Openiddict-identityserver",
    name: "OpeniddictIdentityServer",
    type: "oauth",
    wellKnown: `${options.issuer}/.well-known/openid-configuration`,
    authorization: { params: { scope: "openid profile email apibff" } },
    checks: ["pkce", "state"],
    idToken: true, 
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email, 
      }
    },
    options,
    
  }
}