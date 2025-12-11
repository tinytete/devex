import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Fund, Transaction, PortfolioItem } from './fund';
import { FUNDS, MyPortfolio } from './mock-funds';

@Injectable({
  providedIn: 'root'
})
export class Service {

  private apiUrl = 'http://localhost:8080/funds';

  private funds: Fund[] = FUNDS; 
  private myPortfolio: PortfolioItem[] = MyPortfolio; 
  private transactions: Transaction[] = [];

  constructor(private http: HttpClient) { }

  getTopChartsData(): Observable<Fund[]> {
    return this.http.get<Fund[]>(this.apiUrl);
  }

  addFund(newFund: Fund): Observable<Fund> {
    return this.http.post<Fund>(this.apiUrl, newFund);
  }

  deleteFund(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getFundById(id: number): Fund | undefined { 
    return this.funds.find(fund => fund.Id === id); 
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
    const fundInfo = this.funds.find(f => f.Id === fundId); // ใช้ mock หาชื่อบริษัท
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
  
  updateFund(updatedFund: Fund) { 
    const index = this.funds.findIndex(f => f.Id === updatedFund.Id); 
    if (index > -1) { this.funds[index] = { ...this.funds[index], ...updatedFund }; } 
  }
}