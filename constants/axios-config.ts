// Server-side only config (for API routes)
export const ServerAxiosConfig = {
  headers: {
    "X-Api-Key": process.env.API_HEADER,
  },
  baseURL: process.env.BASE_API_URL,
};
