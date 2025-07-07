"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApi } from "@/hooks/use-api";
import { NetworksResponse } from "@/types";
import React from "react";
import { toast } from "sonner";

export default function Home() {
  const [address, setAddress] = React.useState("");
  const [queryKey, setQueryKey] = React.useState(["address", ""]);

  const { queryResult } = useApi<NetworksResponse>({
    url: `/api/addresses/${address}`,
    queryKey: queryKey,
    method: "GET",
    queryOptions: {
      enabled: !!address.trim(),
    },
  });

  const { data, isLoading, isError, error, isFetching } = queryResult!;

  console.log(data);
  console.log(error);

  const handleFetchAddress = () => {
    if (address.trim()) {
      setQueryKey(["address", address.trim()]);
    }
  };

  React.useEffect(() => {
    let toastId: string | number;

    if (isFetching && !isLoading) {
      toastId = toast.loading("Updating data...");
    }

    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [isFetching, isLoading]);

  React.useEffect(() => {
    if (isError && error) {
      toast.error(`Error: ${(error as Error).message}`);
    }
  }, [isError, error]);

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="w-full max-w-md p-6">
        <div className="mb-6">
          <h1 className="mb-4 text-2xl font-bold">Address Checker</h1>
          <div className="flex gap-2">
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter wallet address..."
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Button
              onClick={handleFetchAddress}
              disabled={isLoading || isFetching || !address.trim()}
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading || isFetching ? "Loading..." : "Check"}
            </Button>
          </div>
        </div>

        {isLoading && <div className="py-4 text-center">Loading...</div>}
        {isError && (
          <div className="py-4 text-red-500">
            Error: {(error as Error).message}
          </div>
        )}
        {data && (
          <div className="rounded-md bg-gray-50 p-4">
            <h2 className="mb-2 font-semibold">Security Score</h2>
            <p className="text-lg">
              {data.securityScore ? data.securityScore.riskScore : "n/a"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
