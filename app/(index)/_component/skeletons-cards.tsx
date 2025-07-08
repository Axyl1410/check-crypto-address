import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle,
  Clock,
  DollarSign,
  Globe,
  Network,
  Shield,
  Target,
  TrendingUp,
  Users,
  XCircle,
  Zap,
} from "lucide-react";

export function SecurityScoreSkeleton() {
  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Score
          </div>
          <Skeleton className="h-6 w-24" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-5 w-5" />
              <Skeleton className="h-8 w-16" />
            </div>
            <p className="text-muted-foreground text-sm">Risk Score</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <Skeleton className="h-8 w-24" />
            </div>
            <p className="text-muted-foreground text-sm">Total Transactions</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              <Skeleton className="h-8 w-16" />
            </div>
            <p className="text-muted-foreground text-sm">Unique Addresses</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TransactionSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card className="glassmorphism">
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
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Average Value</span>
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-purple-600" />
              <span className="text-sm">Large Transactions</span>
            </div>
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4 text-orange-600" />
              <span className="text-sm">Contract Interactions</span>
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
        </CardContent>
      </Card>
      <Card className="glassmorphism">
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
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-600" />
              <span className="text-sm">Transaction Velocity</span>
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Gas Usage Pattern</span>
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm">Flagged Interactions</span>
            </div>
            <Skeleton className="h-4 w-8" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ScamDetailsSkeleton() {
  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Scam Detection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="space-y-2 text-center">
            <Skeleton className="mx-auto h-6 w-20" />
            <p className="text-muted-foreground text-sm">Current Risk Level</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              <Skeleton className="h-8 w-8" />
            </div>
            <p className="text-muted-foreground text-sm">Total Reports</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-5 w-5 text-gray-600" />
              <Skeleton className="h-6 w-20" />
            </div>
            <p className="text-muted-foreground text-sm">Last Flagged</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function NetworksSkeleton() {
  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Supported Networks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center space-y-2 rounded-lg border p-4"
            >
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Skeleton className="h-10 w-64" />
        </div>
      </CardContent>
    </Card>
  );
}
