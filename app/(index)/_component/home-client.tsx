"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useApi } from "@/hooks/use-api";
import { ValidateResponse } from "@/types/validate";
import { validate } from "bitcoin-address-validation";
import { isAddress } from "ethers";
import {
  Activity,
  AlertCircleIcon,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";
import NetworksCard from "./networks-card";
import ScamDetailsCard from "./scam-details-card";
import RiskScorePie from "./score-chart";
import { NetworksSkeleton, ScamDetailsSkeleton } from "./skeletons-cards";

export default function HomeClient() {
  const [address, setAddress] = React.useState("");
  const [queryKey, setQueryKey] = React.useState(["address", ""]);
  const networksPerPage = 8;

  const { queryResult } = useApi<ValidateResponse>({
    url: `/api/addresses/${address}`,
    queryKey: queryKey,
    method: "GET",
    queryOptions: {
      enabled: Boolean(queryKey[1]) && !!address.trim(),
    },
  });

  const { data, isLoading, isError, error, isFetching } = queryResult!;

  console.log(data);

  const handleFetchAddress = () => {
    if (address.trim() && (isAddress(address) || validate(address))) {
      setQueryKey(["address", address.trim()]);
      if (queryResult) queryResult.refetch();
    } else {
      toast.error("Wallet address syntax looks invalid");
    }
  };

  useEffect(() => {
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

  useEffect(() => {
    if (isError && error) {
      toast.error(`Error: ${(error as Error).message}`);
    }
  }, [isError, error]);

  const getRiskColor = (riskLevel: string) => {
    const level = riskLevel.toLowerCase();
    if (level.includes("low")) {
      return "bg-green-100 text-green-800 border-green-200";
    } else if (level.includes("medium")) {
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    } else if (level.includes("high")) {
      return "bg-red-100 text-red-800 border-red-200";
    } else {
      return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // const getRiskIcon = (score: number) => {
  //   if (score >= 80) return <XCircle className="h-5 w-5 text-red-600" />;
  //   if (score >= 60)
  //     return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
  //   return <CheckCircle className="h-5 w-5 text-green-600" />;
  // };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <h1 className="scroll-m-20 gap-2 text-center text-3xl font-extrabold tracking-tight text-balance lg:text-4xl">
            Wallet Security Checker
          </h1>
        </div>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Analyze wallet addresses for security risks and transaction patterns
        </p>
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
        and is unable to actually confirm if specific address exists or belongs
        to someone. Always double check that you are sending/receiving funds to
        an existing address.
      </p>

      {/* Risk Level Alert */}
      {!isError &&
        !isLoading &&
        !isFetching &&
        data?.securityScore?.riskLevel &&
        (() => {
          const level = data.securityScore.riskLevel.toLowerCase();
          let content: {
            icon: React.ReactNode;
            title: string;
            description: string;
            variant?: "destructive" | undefined;
          } = {
            icon: <ShieldCheck className="h-5 w-5" />,
            title: "Safe Wallet",
            description:
              "This wallet appears safe. No significant risks detected.",
          };
          if (level.includes("medium")) {
            content = {
              icon: <AlertTriangle className="h-5 w-5" />,
              title: "Caution",
              description:
                "Some potential risks detected. Review details below before interacting.",
            };
          } else if (level.includes("high")) {
            content = {
              icon: <ShieldAlert className="h-5 w-5" />,
              title: "Warning",
              description:
                "Warning: This wallet address has been flagged for suspicious activity. Please proceed with caution.",
              variant: "destructive",
            };
          }
          return (
            <Alert variant={content.variant} className="glassmorphism mb-6">
              {content.icon}
              <AlertTitle>{content.title}</AlertTitle>
              <AlertDescription>{content.description}</AlertDescription>
            </Alert>
          );
        })()}

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

      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-1/3 justify-center">
            <RiskScorePie
              score={data?.securityScore.riskScore || 0}
              riskLevel={data?.securityScore.riskLevel || "N/A"}
            />
          </div>

          <div className="flex-2/3">
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
          </div>
        </div>

        {/* Networks with Pagination */}
        {isLoading || isError ? (
          <NetworksSkeleton />
        ) : data?.networks ? (
          <NetworksCard
            networks={data.networks}
            networksPerPage={networksPerPage}
          />
        ) : (
          <NetworksSkeleton />
        )}
      </div>
    </div>
  );
}
