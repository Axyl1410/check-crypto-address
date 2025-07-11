import { Network } from "@/types/validate";
import { clsx, type ClassValue } from "clsx";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4,
  )}`;
};

export function assertValue<T>(
  v: T | undefined | null,
  errorMessage: string,
): T {
  if (v === undefined || v === null) {
    throw new Error(errorMessage);
  }

  return v;
}

export function getNetworkInfo(network: Network) {
  return `${network.name} (${network.symbol})`;
}

export function getRiskColor(riskLevel: string) {
  switch (riskLevel.toLowerCase()) {
    case "low":
      return "bg-green-100 text-green-800 border-green-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export function getRiskScoreColor(score: number) {
  if (score >= 80) return "text-red-600";
  if (score >= 60) return "text-yellow-600";
  return "text-green-600";
}

export function getRiskIcon(score: number): React.ReactNode {
  if (score >= 80)
    return React.createElement(XCircle, { className: "h-5 w-5 text-red-600" });
  if (score >= 60)
    return React.createElement(AlertTriangle, {
      className: "h-5 w-5 text-yellow-600",
    });
  return React.createElement(CheckCircle, {
    className: "h-5 w-5 text-green-600",
  });
}

export function getPaginationRange(current: number, total: number) {
  if (total <= 3) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current === 1) {
    return [1, 2, total];
  }
  if (current === total) {
    return [1, total - 1, total];
  }
  return [1, current, total];
}
