import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../app.service';

@Component({
  selector: 'app-buy-fund',
  templateUrl: './buy-fund.component.html',
  styleUrls: ['./buy-fund.component.scss'], // ใช้ SCSS เดียวกับหน้าขาย หรือไฟล์ตัวเองที่มี code เหมือนกัน
  providers: [Service]
})
export class BuyFundComponent implements OnInit {
  fundId!: number;
  fundData: any;
  purchaseAmount: number = 5000; 
  isAgreed: boolean = false;
  today: Date = new Date();
  purchaseSuccess: boolean = false;

  constructor(private route: ActivatedRoute, private service: Service) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      this.fundId = idString ? +idString : 0;
      this.fundData = this.service.getFundById(this.fundId);
    });
  }

  // Helper สำหรับคำนวณใน html
  get purchaseFee(): number {
    return this.purchaseAmount * 0.01; // 1% Fee
  }

  get totalPayment(): number {
    return this.purchaseAmount + this.purchaseFee;
  }

  confirmPurchase() {
    this.purchaseSuccess = true;
    console.log(`ซื้อกองทุน ID: ${this.fundId}, ยอดเงิน: ${this.purchaseAmount}`);
  }
}