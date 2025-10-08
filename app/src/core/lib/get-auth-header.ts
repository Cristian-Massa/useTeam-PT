export const getAuthHeaders = () => {
  // if (typeof window === "undefined") return "";
  const token = localStorage.getItem("accessToken");
  return token ? `Bearer ${token}` : "";
};
