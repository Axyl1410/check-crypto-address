import { Network } from "./validate";

export interface NetworkWithCount {
  network: Network;
  count: number;
}

export interface ScamNetworkResponse {
  data: NetworkWithCount[];
}
