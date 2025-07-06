export interface Network {
  id: string;
  name: string;
  symbol: string;
}

export interface ScamDetails {
  riskLevel: string;
  lastFlaggedDate: string;
  reportCount: string;
}

export interface SecurityScore {
  riskScore: number;
  riskLevel: string;
  totalTransactions: number;
  uniqueAddresses: number;
  totalValue: string;
  averageValue: string;
  largeTransactions: number;
  contractInteractions: number;
  errorTransactions: number;
  transactionVelocity: number;
  gasUsagePattern: string;
  interactionWithFlaggedAddresses: number;
  tokenTransactions: number;
}

export interface NetworksResponse {
  networks: Network[];
  scamDetails: ScamDetails;
  securityScore: SecurityScore;
}
