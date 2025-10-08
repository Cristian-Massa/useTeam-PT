import { LoginResponse } from "@/core/interfaces/login-response";
import { api } from "@/core/lib/api";

export async function handleTokenRefreshAndRetry(failed: any) {
  try {
    const refreshResp = await api<LoginResponse>("/auth/refresh", {
      method: "POST",
    });

    const newAccessToken = refreshResp?.data.accessToken;

    if (failed?.retry) {
      return {
        accessToken: newAccessToken,
        lastApiCall: failed.retry(),
      };
    } else if (failed?.queryClient && failed?.queryKey) {
      // Para queries, invalidar y refetchear
      failed.queryClient.invalidateQueries(failed.queryKey);
    }
  } catch (err) {
    console.error("Error al refrescar token:", err);
  }
}
