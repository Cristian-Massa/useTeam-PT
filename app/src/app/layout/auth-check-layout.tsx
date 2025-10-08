"use client";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { useInitializeAccessToken } from "@/core/hooks/initialize-access-token";

export const AuthCheckLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const { isLoggedIn, isChecking } = useInitializeAccessToken();

  useEffect(() => {
    const handleRedirect = () => {
      if (!isLoggedIn && !isChecking) {
        router.push("/");
      }
    };

    handleRedirect();
  }, [isLoggedIn]);
  return <>{children}</>;
};
