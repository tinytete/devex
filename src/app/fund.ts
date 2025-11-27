// src/app/fund.ts

export interface Fund {
    Id: number;
    FundName: string;
    NAV: number;
    Company: string;
    Ranking: number;
    Return3Y: number;
    Lastrank: number;
    Category: string;
    AUM: string;
    RegisterDate: string;
    RiskLevel: string;
}

export interface Transaction {
    Id: number;
    FundName: string;
    Type: 'BUY' | 'SELL';
    Amount: number;
    TransactionDate: Date;
}

export interface PortfolioItem {
    FundId: number;     
    FundName: string;
    Company: string;   
    Units: number;
    NAV: number;
    TotalValue: number;
    Profit: number;
    LastUpdate: Date;   
}