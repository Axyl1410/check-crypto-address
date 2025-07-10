"use client";

import { CopyButton } from "@/components/common/copy-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/hooks/use-api";
import { ScamReport, ScamReportsResponse } from "@/types/scam-reports";
import { TokenIcon } from "@web3icons/react";
import { formatDistance } from "date-fns";
import { AlertTriangle, ArrowLeft, Calendar, Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

function ScamWalletDetailSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-24" />
      </div>
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-8 w-8" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="space-y-2 p-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-2 p-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-2 p-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/20">
            <div className="flex items-start gap-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-64" />
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Skeleton className="mb-4 h-6 w-40" />
            <div className="overflow-x-auto">
              <table className="min-w-full rounded-lg border text-sm">
                <thead>
                  <tr>
                    <th>
                      <Skeleton className="h-4 w-4" />
                    </th>
                    <th>
                      <Skeleton className="h-4 w-20" />
                    </th>
                    <th>
                      <Skeleton className="h-4 w-32" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td>
                        <Skeleton className="h-4 w-4" />
                      </td>
                      <td>
                        <Skeleton className="h-4 w-20" />
                      </td>
                      <td>
                        <Skeleton className="h-4 w-32" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ScamWalletDetailPage() {
  const params = useParams();
  const router = useRouter();

  const symbol = params.symbol as string;
  const address = params.address as string;

  const { queryResult } = useApi<ScamReportsResponse>({
    url: `/api/scam-reports/${symbol}/${address}`,
    queryKey: ["scam-report-detail", symbol, address],
    method: "GET",
  });

  const { data, isLoading, isError, error, isFetching } = queryResult!;

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

  const wallet: ScamReport | undefined = Array.isArray(data?.data)
    ? data?.data[0]
    : data?.data;

  if (isLoading) {
    return <ScamWalletDetailSkeleton />;
  }

  if (!wallet) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        <Card className="glassmorphism">
          <CardContent className="p-6">
            <div className="text-center">
              <AlertTriangle className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <h2 className="mb-2 text-xl font-semibold">Wallet Not Found</h2>
              <p className="text-muted-foreground">
                The requested wallet address could not be found in our database.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Scam Wallets
        </Button>
      </div>

      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <TokenIcon
              symbol={wallet.walletNetwork.symbol}
              variant="background"
              className="rounded-full"
              size={32}
            />
            <div>
              <h1 className="text-2xl font-bold">
                {wallet.walletNetwork.name} Scam Wallet
              </h1>
              <p className="text-muted-foreground text-sm">
                Reported {wallet.reportCount} times
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Wallet Address</h3>
              <CopyButton
                textToCopy={wallet.address}
                successMessage={{
                  title: "Address Copied!",
                  description: "Wallet address copied to clipboard",
                }}
              />
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="font-mono text-sm break-all">{wallet.address}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold">Report Statistics</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Total Reports:
                    </span>
                    <span className="font-medium">{wallet.reportCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Network:
                    </span>
                    <span className="font-medium">
                      {wallet.walletNetwork.name} (
                      {wallet.walletNetwork.symbol.toUpperCase()})
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <h4 className="font-semibold">Risk Score</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Risk Level:
                    </span>
                    <span className="font-medium">
                      {wallet.securityScore.riskLevel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Risk Score:
                    </span>
                    <span className="font-medium">
                      {wallet.securityScore.riskScore}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold">Timeline</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Last Reported:
                    </span>
                    <span className="font-medium">
                      {formatDistance(
                        new Date(wallet.lastReported),
                        new Date(),
                        { addSuffix: true },
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      First Detected:
                    </span>
                    <span className="font-medium">
                      {formatDistance(
                        new Date(wallet.firstReported),
                        new Date(),
                        { addSuffix: true },
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600" />
              <div>
                <h4 className="mb-1 font-semibold text-red-800 dark:text-red-200">
                  Warning: Scam Wallet Detected
                </h4>
                <p className="text-sm text-red-700 dark:text-red-300">
                  This wallet address has been reported multiple times for
                  fraudulent activities. Exercise extreme caution and do not
                  send any funds to this address.
                </p>
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold">Recent Reports</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full rounded-lg border text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="px-4 py-2 text-left">#</th>
                    <th className="px-4 py-2 text-left">Reported At</th>
                    <th className="px-4 py-2 text-left">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {wallet.reports && wallet.reports.length > 0 ? (
                    wallet.reports.slice(0, 10).map((report, idx) => (
                      <tr key={report.id} className="border-b last:border-0">
                        <td className="px-4 py-2">{idx + 1}</td>
                        <td className="px-4 py-2">
                          {formatDistance(
                            new Date(report.createdAt),
                            new Date(),
                            { addSuffix: true },
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {report.reason || (
                            <span className="text-muted-foreground italic">
                              No reason provided
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-muted-foreground px-4 py-2 text-center"
                      >
                        No reports found for this wallet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
