"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useApi } from "@/hooks/use-api";
import { NetworksResponse } from "@/types";
import {
  Activity,
  AlertCircleIcon,
  AlertTriangle,
  CheckCircle,
  Search,
  XCircle,
} from "lucide-react";
import React from "react";
import { toast } from "sonner";
import NetworksCard from "./NetworksCard";
import ScamDetailsCard from "./ScamDetailsCard";
import SecurityScoreCard from "./SecurityScoreCard";
import {
  NetworksSkeleton,
  ScamDetailsSkeleton,
  SecurityScoreSkeleton,
  TransactionSkeleton,
} from "./SkeletonCards";
import TransactionCard from "./TransactionCard";

export default function HomeClient() {
  const [address, setAddress] = React.useState("");
  const [queryKey, setQueryKey] = React.useState(["address", ""]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const networksPerPage = 8;

  const { queryResult } = useApi<NetworksResponse>({
    url: `/api/addresses/${address}`,
    queryKey: queryKey,
    method: "GET",
    queryOptions: {
      enabled: Boolean(queryKey[1]) && !!address.trim(),
    },
  });

  const { data, isLoading, isError, error, isFetching } = queryResult!;

  const handleFetchAddress = () => {
    if (address.trim()) {
      setCurrentPage(1);
      setQueryKey(["address", address.trim()]);
      if (queryResult) queryResult.refetch();
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

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return "text-red-600";
    if (score >= 60) return "text-yellow-600";
    return "text-green-600";
  };

  const getRiskIcon = (score: number) => {
    if (score >= 80) return <XCircle className="h-5 w-5 text-red-600" />;
    if (score >= 60)
      return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <CheckCircle className="h-5 w-5 text-green-600" />;
  };

  const totalPages = data?.networks
    ? Math.ceil(data.networks.length / networksPerPage)
    : 0;

  function getPaginationRange(current: number, total: number) {
    const delta = 1;
    const range: (number | string)[] = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);
    for (let i = left; i <= right; i++) {
      range.push(i);
    }
    if (total > 1) {
      range.push(total);
    }
    return range;
  }

  console.log(data);

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <h1 className="scroll-m-20 gap-2 text-center text-4xl font-extrabold tracking-tight text-balance">
              Wallet Security Checker
            </h1>
          </div>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Analyze wallet addresses for security risks and transaction patterns
          </p>
          <div className="sr-only">
            <ModeToggle />
          </div>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Enter Wallet Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Wallet Address - btc, eth, sol, ..."
                className="flex-1"
                disabled={isLoading || isFetching}
              />
              <Button
                onClick={handleFetchAddress}
                disabled={isLoading || isFetching || !address.trim()}
                className="sm:w-auto"
              >
                {isLoading || isFetching ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Check Address
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error State */}
        {(isError ||
          !data?.scamDetails ||
          !data.networks ||
          !data.securityScore) && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircleIcon />
            <AlertTitle>Invalid Wallet Address</AlertTitle>
            <AlertDescription>
              <p>
                Wallet address syntax looks invalid. Please check the address
                and try again.
              </p>
            </AlertDescription>
          </Alert>
        )}

        {/* Results Section */}
        <div className="space-y-6">
          {/* Security Score Overview */}
          {isLoading || isError ? (
            <SecurityScoreSkeleton />
          ) : data?.securityScore ? (
            <SecurityScoreCard
              securityScore={data.securityScore}
              getRiskColor={getRiskColor}
              getRiskScoreColor={getRiskScoreColor}
              getRiskIcon={getRiskIcon}
            />
          ) : (
            <SecurityScoreSkeleton />
          )}

          {/* Transaction Details */}
          {isLoading || isError ? (
            <TransactionSkeleton />
          ) : data?.securityScore ? (
            <TransactionCard securityScore={data.securityScore} />
          ) : (
            <TransactionSkeleton />
          )}

          {/* Scam Details */}
          {isLoading || isError ? (
            <ScamDetailsSkeleton />
          ) : data?.scamDetails ? (
            <ScamDetailsCard
              scamDetails={data.scamDetails}
              getRiskColor={getRiskColor}
            />
          ) : (
            <ScamDetailsSkeleton />
          )}

          {/* Networks with Pagination */}
          {isLoading || isError ? (
            <NetworksSkeleton />
          ) : data?.networks ? (
            <NetworksCard
              networks={data.networks}
              currentPage={currentPage}
              totalPages={totalPages}
              getPaginationRange={getPaginationRange}
              setCurrentPage={setCurrentPage}
              networksPerPage={networksPerPage}
            />
          ) : (
            <NetworksSkeleton />
          )}
        </div>
      </div>
    </div>
  );
}
