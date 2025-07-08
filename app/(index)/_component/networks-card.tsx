import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network as NetworkType } from "@/types/validate";
import { TokenIcon } from "@web3icons/react";
import { Globe } from "lucide-react";
import Pagination from "../../../components/common/pagination";

export default function NetworksCard({
  networks,
  networksPerPage,
}: {
  networks: NetworkType[];
  networksPerPage: number;
}) {
  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Supported Networks ({networks.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Pagination
          data={networks}
          itemsPerPage={networksPerPage}
          render={(pageNetworks) => (
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {pageNetworks.map((network) => (
                <div
                  key={network.id}
                  className="hover:bg-accent hover:border-accent-foreground/20 group flex cursor-pointer flex-col items-center rounded-lg border p-4 transition-colors"
                >
                  <div className="h-6 w-6">
                    <TokenIcon
                      symbol={network.symbol.toLowerCase()}
                      variant="branded"
                      size="24"
                      allowReorder="yes"
                    />
                  </div>
                  <div className="text-muted-foreground text-center text-sm font-medium">
                    {network.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
}
