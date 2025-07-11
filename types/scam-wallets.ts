export interface ScamWalletNetwork {
  symbol: string;
}

export interface ScamWallet {
  id: string;
  address: string;
  reportCount: string;
  lastReported: string;
  walletNetworkId: string;
  walletNetwork: ScamWalletNetwork;
}

export interface ScamWalletsPageInfo {
  total: number;
  count: number;
  current: number;
}

export interface ScamWalletsResponse {
  data: ScamWallet[];
  page: ScamWalletsPageInfo;
}
