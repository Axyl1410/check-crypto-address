export interface ScamReport {
  id: string;
  address: string;
  reportCount: string;
  firstReported: string;
  lastReported: string;
  walletNetworkId: string;
  walletNetwork: WalletNetwork;
  securityScore: SecurityScore;
  reports: IndividualReport[];
}

export interface WalletNetwork {
  id: string;
  name: string;
  symbol: string;
}

export interface SecurityScore {
  riskScore: number;
  riskLevel: string;
}

export interface IndividualReport {
  id: string;
  reason: string;
  createdAt: string;
}

export interface ScamReportsResponse {
  success: string;
  data: ScamReport[];
}
