import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SecurityScore } from "@/types/response";
import { BarChart3, Shield, Users } from "lucide-react";
import React from "react";

interface SecurityScoreCardProps {
  securityScore: SecurityScore;
  getRiskColor: (riskLevel: string) => string;
  getRiskScoreColor: (score: number) => string;
  getRiskIcon: (score: number) => React.ReactNode;
}

export default function SecurityScoreCard({
  securityScore,
  getRiskColor,
  getRiskScoreColor,
  getRiskIcon,
}: SecurityScoreCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Score
          </div>
          <Badge
            variant="outline"
            className={getRiskColor(securityScore.riskLevel)}
          >
            {securityScore.riskLevel || "N/A"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              {getRiskIcon(securityScore.riskScore)}
              <span
                className={`text-3xl font-bold ${getRiskScoreColor(
                  securityScore.riskScore,
                )}`}
              >
                {securityScore.riskScore}
              </span>
            </div>
            <p className="text-muted-foreground text-sm">Risk Score</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span className="text-2xl font-bold">
                {securityScore.totalTransactions.toLocaleString()}
              </span>
            </div>
            <p className="text-muted-foreground text-sm">Total Transactions</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold">
                {securityScore.uniqueAddresses}
              </span>
            </div>
            <p className="text-muted-foreground text-sm">Unique Addresses</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
