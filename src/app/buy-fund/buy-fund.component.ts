import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // ✅ Import Router
import { Service } from '../app.service';

@Component({
  selector: 'app-buy-fund',
  templateUrl: './buy-fund.component.html',
  styleUrls: ['./buy-fund.component.scss'],
  providers: [Service]
})
export class BuyFundComponent implements OnInit {
  fundId!: number;
  fundData: any;
  purchaseAmount: number = 5000; 
  isAgreed: boolean = false;
  today: Date = new Date();
  purchaseSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private service: Service,
    private router: Router // ✅ Inject Router
) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      this.fundId = idString ? +idString : 0;
      this.fundData = this.service.getFundById(this.fundId);
    });
  }

  // ✅ คำนวณอัตโนมัติ (Real-time)
  get purchaseFee(): number {
    return this.purchaseAmount * 0.01; // ค่าธรรมเนียม 1%
  }

  get totalPayment(): number {
    return this.purchaseAmount + this.purchaseFee;
  }

  confirmPurchase() {
    this.purchaseSuccess = true; // โชว์ Popup
  }

  // ✅ ฟังก์ชันกดปุ่ม "ตกลง" แล้วกลับหน้าแรก
  closeSuccess() {
    this.router.navigate(['/']); 
  }
}