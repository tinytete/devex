import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // 1. พระเอกของเรา (สั่งของ)
import { Observable, of } from 'rxjs'; // 2. ตัวช่วยรอรับของ
import { Fund, Transaction, PortfolioItem } from './fund';
import { FUNDS, MyPortfolio } from './mock-funds'; // 3. ยังเก็บ Mock ไว้กันเหนียว (สำหรับหน้าอื่นที่ยังไม่ได้แก้)

@Injectable({
  providedIn: 'root'
})
export class Service {

  // ที่อยู่ของ Spring Boot (หลังบ้าน)
  private apiUrl = 'http://localhost:8080/funds';

  // ข้อมูลจำลอง (Mock Data) - เอาไว้ใช้กับหน้า Detail/Portfolio ไปก่อน จะได้ไม่พัง
  private funds: Fund[] = FUNDS; 
  private myPortfolio: PortfolioItem[] = MyPortfolio; 
  private transactions: Transaction[] = [];

  // ฉีด HttpClient เข้ามาใช้งาน
  constructor(private http: HttpClient) { }

  // ----------------------------------------------------
  // โซนนี้ต่อกับ Spring Boot (ของจริง) 🚀
  // ----------------------------------------------------

  // 1. ดึงข้อมูลกองทุนทั้งหมด (ใช้ Observable)
  getTopChartsData(): Observable<Fund[]> {
    return this.http.get<Fund[]>(this.apiUrl);
  }

  // 2. เพิ่มกองทุนใหม่
  addFund(newFund: Fund): Observable<Fund> {
    return this.http.post<Fund>(this.apiUrl, newFund);
  }

  // 3. ลบกองทุน
  deleteFund(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ----------------------------------------------------
  // โซนนี้ยังใช้ Mock Data (ของปลอม) 🛠️
  // (เก็บไว้ก่อน เพื่อให้หน้า Detail และ Portfolio ไม่ Error)
  // ----------------------------------------------------

  getFundById(id: number): Fund | undefined { 
    // ดึงจาก Mock ไปก่อนครับ เพราะหน้า Detail ยังไม่ได้แก้โค้ดรับ Observable
    return this.funds.find(fund => fund.Id === id); 
  }

  // ค้นหากองทุน (Mock)
  searchFunds(term: string): Observable<Fund[]> { 
    if (!term.trim()) { return of([]); } 
    return of(this.funds.filter(fund => fund.FundName.toLowerCase().includes(term.toLowerCase()))); 
  }

  // ส่วนของ Portfolio (Mock)
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
    // อันนี้ Mock ไว้ก่อนครับ
    const index = this.funds.findIndex(f => f.Id === updatedFund.Id); 
    if (index > -1) { this.funds[index] = { ...this.funds[index], ...updatedFund }; } 
  }
}