import Pagination from "@/components/common/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { useApi } from "@/hooks/use-api";
import { ScamNetworkResponse } from "@/types/scam-network";
import { TokenIcon } from "@web3icons/react";
import { NetworkListSkeleton } from "./skeleton-cards";

export default function Network() {
  const { queryResult } = useApi<ScamNetworkResponse>({
    url: "/api/scam-wallets/networks",
    queryKey: ["scam-wallets-networks"],
    method: "GET",
  });

  const { data, isLoading } = queryResult!;

  return (
    <Card className="h-fit">
      <CardContent>
        <div className="flex flex-col gap-2">
          <h1>Reports by Chain</h1>
          <div className="flex flex-col gap-2">
            {isLoading ? (
              <NetworkListSkeleton />
            ) : (
              data?.data && (
                <Pagination
                  data={data.data}
                  itemsPerPage={10}
                  render={(items) => (
                    <div className="space-y-2">
                      {items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded border p-2"
                        >
                          <div className="flex gap-2">
                            <TokenIcon
                              symbol={item.network.symbol}
                              variant="background"
                              className="rounded-full"
                              allowReorder="yes"
                            />
                            <span>{item.network.name}</span>
                          </div>
                          <span className="text-muted-foreground text-sm">
                            {item.count} reports
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                />
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
