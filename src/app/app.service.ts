// src/app/app.service.ts
import { Injectable } from '@angular/core';
import { Fund } from './fund';
import { FUNDS } from './mock-funds';

@Injectable()
export class Service {
  private funds: Fund[] = FUNDS; 

  getTopChartsData(): Fund[] {
    return this.funds; 
  }

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
    if (index > -1) {
      this.funds[index] = { ...this.funds[index], ...updatedFund }; 
    }
  }

  deleteFund(id: number) {
    this.funds = this.funds.filter(f => f.Id !== id);
  }
}