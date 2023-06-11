export const oktaConfig = {
  clientId: "0oa9wy65wrpNH3q0U5d7",
  issuer: "https://dev-98575878.okta.com/oauth2/default",
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};
