"use client";

import { CopyButton } from "@/components/common/copy-button";
import Pagination from "@/components/common/pagination";
import { TooltipWrapper } from "@/components/common/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useApi } from "@/hooks/use-api";
import { ScamWalletsResponse } from "@/types";
import { TokenIcon } from "@web3icons/react";
import { formatDistance } from "date-fns";
import { AlertTriangle, ListChecksIcon } from "lucide-react";
import { useState } from "react";
import Network from "./_component/network";
import { ScamWalletsGridSkeleton } from "./_component/skeleton-cards";

export default function Page() {
  const [page, setPage] = useState(1);
  const { queryResult } = useApi<ScamWalletsResponse>({
    url: "/api/scam-wallets",
    queryKey: ["scam-wallets", page],
    method: "GET",
    params: {
      page: page.toString(),
      search: "",
    },
  });

  const { data, isLoading } = queryResult!;

  return (
    <div className="flex flex-col gap-8">
      <Card className="overflow-hidden py-0">
        <CardContent className="px-0">
          <div className="flex flex-col gap-2 lg:flex-row">
            <div className="flex flex-1 flex-col gap-2 p-6">
              <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-balance lg:text-4xl">
                Scam <span className="text-primary/85">Crypto</span> Wallets
              </h1>
              <h2 className="text-primary/85 scroll-m-20 text-2xl font-semibold tracking-tight">
                Monitor and track reported malicious wallets
              </h2>
              <p className="leading-7 [&:not(:first-child)]:mt-4">
                Discover a detailed compilation of user-reported cryptocurrency
                scam addresses. Verify wallet addresses to protect your
                investments and avoid fraud. Stay informed with our regularly
                updated database of fraudulent addresses.
              </p>
              <div className="flex gap-2">
                <Input className="flex-1" placeholder="Search for a wallet" />
                <Button>Search</Button>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-tl bg-linear-to-tl from-white to-blue-100 p-6 lg:border-l-2 dark:from-slate-900 dark:to-slate-800">
              <div className="flex gap-2">
                <div className="bg-muted rounded border p-4">
                  <AlertTriangle size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold">
                    {isLoading ? (
                      <TextShimmer>---</TextShimmer>
                    ) : (
                      data?.page.count || "Error"
                    )}
                  </p>
                  <p className="text-sm">Total Reports</p>
                </div>
              </div>
              <p className="max-w-xs">
                Total scam reports in our database, helping protect the crypto
                community from fraudulent activities
              </p>
              <div className="bg-muted flex flex-col gap-2 rounded border p-4">
                <div className="flex items-center gap-1">
                  <ListChecksIcon size={20} />
                  <p className="text-sm font-bold">Quick Report</p>
                </div>
                <p className="max-w-xs text-sm">
                  Help the community by reporting suspicious wallet addresses
                </p>
                <TooltipWrapper label="Coming Soon">
                  <Button disabled className="w-full">
                    Report Wallet
                  </Button>
                </TooltipWrapper>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="gap-8 lg:flex">
        <div className="mb-2 flex-1 lg:mb-0">
          {isLoading ? (
            <ScamWalletsGridSkeleton />
          ) : (
            data?.data && (
              <Pagination
                data={data.data}
                itemsPerPage={10}
                totalPages={
                  data?.page.count ? Math.ceil(data.page.count / 10) : 1
                }
                currentPage={page}
                onPageChange={(newPage) => {
                  setPage(newPage);
                }}
                render={(pageData) => (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {pageData.map((wallet) => (
                      <Card key={wallet.id} className="overflow-hidden">
                        <CardContent>
                          <div className="mb-4 flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <TokenIcon
                                symbol={wallet.walletNetwork.symbol}
                                variant="background"
                                className="rounded-full"
                                size={32}
                              />
                              <div>
                                <p className="text-muted-foreground text-sm font-medium">
                                  {wallet.walletNetwork.symbol.toUpperCase()}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                  {wallet.reportCount} reports
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <div className="mb-1 flex items-center justify-between">
                                <p className="text-sm font-medium">
                                  Wallet Address
                                </p>
                                <CopyButton
                                  textToCopy={wallet.address}
                                  successMessage={{
                                    title: "Address Copied!",
                                    description:
                                      "Wallet address copied to clipboard",
                                  }}
                                />
                              </div>
                              <p className="bg-muted rounded p-2 font-mono text-xs break-all">
                                {wallet.address}
                              </p>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Last Reported:
                              </span>
                              <span>
                                {formatDistance(
                                  new Date(wallet.lastReported),
                                  new Date(),
                                  { addSuffix: true },
                                )}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              />
            )
          )}
        </div>
        <Network />
      </div>
    </div>
  );
}
