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
  purchaseAmount: number = 1000; 
  isAgreed: boolean = false;
  today: Date = new Date();
  purchaseSuccess: boolean = false;

  constructor(private route: ActivatedRoute, private service: Service) {}

  ngOnInit(): void {
    // ✅ Logic การดึงข้อมูลกองทุนตาม ID ถูกต้องและไม่ Crash
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      this.fundId = idString ? +idString : 0;
      this.fundData = this.service.getFundById(this.fundId);
    });
  }

  get purchaseFee(): number { 
    return this.calculateFee(this.purchaseAmount, 0.01); 
  }

  get totalPayment(): number {
    return this.purchaseAmount + this.purchaseFee; 
  }

  calculateFee(amount: number, percentage: number): number {
    if (!amount || amount < 0) return 0; return amount * percentage; 
  }

  confirmPurchase() { 
    this.purchaseSuccess = true;
  }
}