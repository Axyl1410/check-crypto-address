import { Network } from "@/types/response";
import { clsx, type ClassValue } from "clsx";
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
