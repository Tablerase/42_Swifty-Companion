export const AUTH_CONFIG = {
  TOKEN_KEY: "token42",
  USER_KEY: "user42",
  ENDPOINTS: {
    AUTHORIZE: "https://api.intra.42.fr/oauth/authorize",
    TOKEN: "https://api.intra.42.fr/oauth/token",
    ME: "https://api.intra.42.fr/v2/me",
  },
  REDIRECT_URI: "companion42://login",
} as const;
