import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertTriangle, ListChecksIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="overflow-hidden py-0">
        <CardContent className="px-0">
          <div className="flex gap-2">
            <div className="flex flex-1 flex-col gap-2 p-6">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
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
            <div className="flex flex-col gap-2 rounded-tl border-l-2 bg-linear-to-tl from-white to-blue-100 p-6 dark:from-slate-900 dark:to-slate-800">
              <div className="flex gap-2">
                <div className="bg-muted rounded border p-4">
                  <AlertTriangle size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-red-500">---</p>
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
                <Button>Report Wallet</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
