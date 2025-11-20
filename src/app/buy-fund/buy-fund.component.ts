import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../app.service';

@Component({
  selector: 'app-buy-fund',
  templateUrl: './buy-fund.component.html',
  styleUrl: './buy-fund.component.scss',
  providers: [Service]
})
export class BuyFundComponent implements OnInit {
  fundId!: number;
  fundData: any;
  purchaseAmount: number = 1000; // มูลค่าเริ่มต้น
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
  
  calculateFee(amount: number, percentage: number): number {
    if (!amount || amount < 0) return 0;
    return amount * percentage;
  }

  confirmPurchase() {
    // 💡 Logic สำหรับส่งคำสั่งซื้อ (ใน Production ต้องเรียก API)
    this.purchaseSuccess = true;
    console.log(`ยืนยันซื้อ ${this.fundData.FundName} มูลค่า ${this.purchaseAmount} บาท`);
  }
}