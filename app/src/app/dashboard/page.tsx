"use client";

import { useGetMe } from "@/app/dashboard/hooks/queries/use-get-me";
import { Button } from "@/core/components/ui/button";
import { Skeleton } from "@/core/components/ui/skeleton";
import Link from "next/link";

const DashboardPage = () => {
  const { me } = useGetMe();
  return (
    <div className="h-full flex flex-col gap-4 justify-center items-center">
      <span className="flex gap-1">
        <h1>Bienvenido </h1>
        {me ? (
          <h1>{me.name}</h1>
        ) : (
          <Skeleton className="w-[200px] h-6 bg-gray-200" />
        )}
      </span>
      <Link href={"/dashboard/workspaces"}>
        <Button>Ir a tu lista de kanbans</Button>
      </Link>
    </div>
  );
};

export default DashboardPage;
