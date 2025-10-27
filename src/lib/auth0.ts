import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN,
  async beforeSessionSaved(session) {
    return {
      ...session,
      user: {
        ...session.user,
        ersilia: session.user["ersiliaroles"],
      },
    };
  },
});
