import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScamDetails } from "@/types/response";
import { AlertCircle, AlertTriangle, Clock } from "lucide-react";

interface ScamDetailsCardProps {
  scamDetails: ScamDetails;
  getRiskColor: (riskLevel: string) => string;
}

export default function ScamDetailsCard({
  scamDetails,
  getRiskColor,
}: ScamDetailsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Scam Detection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="space-y-2 text-center">
            <Badge
              variant="outline"
              className={getRiskColor(scamDetails.riskLevel)}
            >
              {scamDetails.riskLevel || "N/A"} Risk
            </Badge>
            <p className="text-muted-foreground text-sm">Current Risk Level</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              <span className="text-2xl font-bold">
                {scamDetails.reportCount}
              </span>
            </div>
            <p className="text-muted-foreground text-sm">Total Reports</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-5 w-5 text-gray-600" />
              <span className="text-lg font-semibold">
                {!scamDetails.lastFlaggedDate
                  ? "N/A"
                  : new Date(scamDetails.lastFlaggedDate).toLocaleDateString()}
              </span>
            </div>
            <p className="text-muted-foreground text-sm">Last Flagged</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
