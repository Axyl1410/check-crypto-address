import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SecurityScore } from "@/types/response";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Network,
  Target,
  TrendingUp,
  XCircle,
  Zap,
} from "lucide-react";

interface TransactionCardProps {
  securityScore: SecurityScore;
}

export default function TransactionCard({
  securityScore,
}: TransactionCardProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Transaction Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-sm">Total Value</span>
            </div>
            <span className="font-semibold text-green-600">
              {securityScore.totalValue}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Average Value</span>
            </div>
            <span className="font-semibold">
              {securityScore.averageValue.slice(0, 4)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-purple-600" />
              <span className="text-sm">Large Transactions</span>
            </div>
            <span className="font-semibold text-purple-600">
              {securityScore.largeTransactions}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4 text-orange-600" />
              <span className="text-sm">Contract Interactions</span>
            </div>
            <span className="font-semibold text-orange-600">
              {securityScore.contractInteractions}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Risk Indicators
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm">Error Transactions</span>
            </div>
            <span className="font-semibold text-red-600">
              {securityScore.errorTransactions}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-600" />
              <span className="text-sm">Transaction Velocity</span>
            </div>
            <span className="font-semibold text-yellow-600">
              {securityScore.transactionVelocity.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Gas Usage Pattern</span>
            </div>
            <span className="font-semibold text-green-600">
              {securityScore.gasUsagePattern}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm">Flagged Interactions</span>
            </div>
            <span className="font-semibold text-red-600">
              {securityScore.interactionWithFlaggedAddresses}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
