import { QueryClient } from "@tanstack/react-query";

/**
 * create default queryClient
 * manage all queries in the app and mutations like cache, staleTime, retry, etc.
 * @returns {QueryClient}
 */
export const queryClient = new QueryClient({
  // default options for all queries
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
      refetchOnWindowFocus: true,
    },
  },
});
