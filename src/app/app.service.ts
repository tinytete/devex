import { Injectable } from '@angular/core';
import { Fund, Transaction, PortfolioItem } from './fund';
import { FUNDS, MyPortfolio } from './mock-funds';
import { Observable, of } from 'rxjs';

@Injectable()
export class Service {
  private funds: Fund[] = FUNDS; 
  private myPortfolio: PortfolioItem[] = MyPortfolio; 
  private transactions: Transaction[] = [];

  getTopChartsData(): Fund[] { return this.funds; }
  
  getFundById(id: number): Fund | undefined { 
    return this.funds.find(fund => fund.Id === id); 
  }
  
  addFund(newFund: Fund) { 
      const maxId = this.funds.length > 0 ? Math.max(...this.funds.map(f => f.Id)) : 0; 
      newFund.Id = maxId + 1; 
      this.funds.push(newFund); 
  }

  updateFund(updatedFund: Fund) { 
    const index = this.funds.findIndex(f => f.Id === updatedFund.Id); 
    if (index > -1) { this.funds[index] = { ...this.funds[index], ...updatedFund }; } 
  }
  
  deleteFund(id: number) { 
    this.funds = this.funds.filter(f => f.Id !== id); 
  }
  
  searchFunds(term: string): Observable<Fund[]> { 
    if (!term.trim()) { return of([]); } 
    return of(this.funds.filter(fund => fund.FundName.toLowerCase().includes(term.toLowerCase()))); 
  }

  getPortfolio(): PortfolioItem[] {
    return this.myPortfolio;
  }

  updatePortfolio(fundId: number, fundName: string, unitsChange: number, nav: number) {
    const index = this.myPortfolio.findIndex(p => p.FundId === fundId);
    
    const fundInfo = this.funds.find(f => f.Id === fundId);
    const companyName = fundInfo ? fundInfo.Company : '-';

    if (index > -1) {

      const item = this.myPortfolio[index];
      item.Units += unitsChange;
      item.NAV = nav; 
      item.TotalValue = item.Units * nav; 
      item.LastUpdate = new Date();       
      

      this.myPortfolio.splice(index, 1);
      this.myPortfolio.unshift(item);
    } else {

      if (unitsChange > 0) {
        const newItem: PortfolioItem = {
          FundId: fundId,
          FundName: fundName,
          Company: companyName, 
          Units: unitsChange,
          NAV: nav,             
          TotalValue: unitsChange * nav,
          LastUpdate: new Date()
        };
        this.myPortfolio.unshift(newItem); 
      }
    }
  }

  getTransactions(): Transaction[] { return this.transactions; }
  
  addTransaction(fundName: string, type: 'BUY' | 'SELL', amount: number) {
      const newTx: Transaction = { 
        Id: this.transactions.length + 1, 
        FundName: fundName, 
        Type: type, 
        Amount: amount, 
        TransactionDate: new Date() 
      };
      
      this.transactions.unshift(newTx); 
  }
}