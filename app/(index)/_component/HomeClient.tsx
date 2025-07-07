"use client";

import { ModeToggle } from "@/components/common/mode-toggle";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useApi } from "@/hooks/use-api";
import { NetworksResponse } from "@/types";
import { isAddress } from "ethers";
import {
  Activity,
  AlertCircleIcon,
  AlertTriangle,
  CheckCircle,
  Wallet,
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
    if (address.trim() && isAddress(address)) {
      setCurrentPage(1);
      setQueryKey(["address", address.trim()]);
      if (queryResult) queryResult.refetch();
    } else {
      toast.error("Wallet address syntax looks invalid");
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
    if (total <= 3) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current === 1) {
      return [1, 2, total];
    }
    if (current === total) {
      return [1, total - 1, total];
    }
    return [1, current, total];
  }

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
        <Card className="glassmorphism mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Check Wallet
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

        <p className="text-muted-foreground mb-6 text-center text-sm">
          Disclaimer: This tool will try to validate the syntax of your address
          and is unable to actually confirm if specific address exists or
          belongs to someone. Always double check that you are sending/receiving
          funds to an existing address.
        </p>

        {/* Error State */}
        {isError &&
          (!data?.scamDetails || !data.networks || !data.securityScore) && (
            <Alert variant="destructive" className="glassmorphism mb-6">
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
          <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            About Crypto Address Validation
          </h1>
          <div className="flex flex-col gap-2">
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Checking a cryptocurrency wallet address is an essential step in
              the process of sending and receiving cryptocurrency transactions.
              This process involves verifying that the address is valid and
              ensuring that it belongs to the correct recipient.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              To validate a cryptocurrency wallet address, there are several
              online tools and services available. These tools typically require
              users to input the address they wish to verify and then perform a
              series of checks to confirm its validity.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              One common method for validating a wallet address is to check its
              format. Each cryptocurrency network has a unique address format,
              and addresses that don't conform to the correct format will be
              considered invalid.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Another important aspect of validating a wallet address is to
              check its transaction history. This step can help users confirm
              that the address belongs to the intended recipient and has a
              legitimate transaction history. Checking the balance of the
              address is also important, as it ensures that the recipient has
              sufficient funds to receive the transaction.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Using a trusted and reliable tool to validate wallet addresses can
              help reduce the risk of errors and fraud when sending or receiving
              cryptocurrency. By verifying the accuracy of a wallet address
              before sending or receiving funds, users can ensure that their
              transactions are secure and that their funds are being sent to the
              correct destination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
