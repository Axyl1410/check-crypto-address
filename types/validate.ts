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
}

export interface ValidateResponse {
  networks: Network[];
  scamDetails: ScamDetails;
  securityScore: SecurityScore;
}
