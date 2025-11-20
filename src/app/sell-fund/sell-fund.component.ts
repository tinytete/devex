// src/app/sell-fund/sell-fund.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../app.service';

@Component({
  selector: 'app-sell-fund',
  templateUrl: './sell-fund.component.html',
  styleUrl: './sell-fund.component.scss',
  providers: [Service] // ✅ เพิ่ม Service Provider
})
export class SellFundComponent implements OnInit { // ✅ Implement OnInit
  fundId!: number;
  fundData: any;
  sellAmount: number = 0;
  sellAllUnits: boolean = false; // สำหรับ Checkbox
  today: Date = new Date();
  sellSuccess: boolean = false;

  // Mock data: สมมติว่าถือครองอยู่ 1500 หน่วย
  heldUnits: number = 1500; 

  constructor(private route: ActivatedRoute, private service: Service) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      this.fundId = idString ? +idString : 0;
      this.fundData = this.service.getFundById(this.fundId);
      this.updateSellAmount(); // อัปเดตเมื่อโหลด
    });
  }
  
  // ฟังก์ชันคำนวณค่าธรรมเนียม
  calculateFee(amount: number, percentage: number): number {
    if (!amount || amount < 0) return 0;
    return amount * percentage;
  }
  
  // ฟังก์ชันอัปเดตมูลค่าที่ต้องการขายเมื่อกดขายทั้งหมด
  updateSellAmount() {
    if (this.sellAllUnits) {
      this.sellAmount = this.heldUnits;
    } else if (this.sellAmount > this.heldUnits) {
      this.sellAmount = this.heldUnits; // จำกัดไม่ให้ขายเกินที่มี
    }
  }

  confirmSell() {
    // 💡 Logic สำหรับส่งคำสั่งขาย
    this.sellSuccess = true;
    console.log(`ยืนยันขาย ${this.fundData.FundName} จำนวน ${this.sellAmount} หน่วย`);
  }
}