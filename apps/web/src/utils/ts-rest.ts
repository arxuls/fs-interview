import { contract } from "@interview-kit/api/index";
import { env } from "@interview-kit/env/web";
import { QueryClient } from "@tanstack/react-query";
import { tsRestFetchApi } from "@ts-rest/core";
import { initTsrReactQuery } from "@ts-rest/react-query/v5";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60,
    },
  },
});

const clientArgs = {
  baseUrl: `${env.NEXT_PUBLIC_SERVER_URL}/rest`,
  baseHeaders: {},
  api: tsRestFetchApi,
};

export const tsr = initTsrReactQuery(contract, clientArgs);
