import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRefresh } from "@/core/hooks/mutation/useRefresh";

export const useInitializeAccessToken = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { refresh } = useRefresh();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      refresh().catch(() => setLoggedIn(false));
      return;
    }
    const decoded: any = jwt.decode(token);
    const isExpired = decoded?.exp ? Date.now() >= decoded.exp * 1000 : true;
    if (isExpired) {
      refresh().catch(() => setLoggedIn(false));
    } else {
      setLoggedIn(true);
    }
    setIsChecking(false);
  }, []);
  return {
    isLoggedIn,
    isChecking,
  };
};
