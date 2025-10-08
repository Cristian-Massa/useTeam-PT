"use client";

import { PropsWithChildren, useState } from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider, useAuth } from "@/core/context/auth-context";
import { handleTokenRefreshAndRetry } from "@/core/lib/revalidate-access-token";

export const Providers = ({ children }: PropsWithChildren) => {
  const { handleUser } = useAuth();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: async (error, query) => {
            if (
              (error as any)?.status === 401 ||
              (error as any)?.cause === "access_token_expired"
            ) {
              const result = await handleTokenRefreshAndRetry(query);
              if (result?.accessToken) {
                handleUser(result?.accessToken);
              }
              result?.lastApiCall();
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: async (error, variables, context, mutation) => {
            if (
              (error as any)?.status === 401 ||
              (error as any)?.cause === "access_token_expired"
            ) {
              const result = await handleTokenRefreshAndRetry(mutation);

              if (result?.accessToken) {
                handleUser(result.accessToken);
              }
              result?.lastApiCall();
            }
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};
