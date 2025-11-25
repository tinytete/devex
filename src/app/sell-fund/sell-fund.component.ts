import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // ✅ Import Router
import { Service } from '../app.service';

@Component({
  selector: 'app-sell-fund',
  templateUrl: './sell-fund.component.html',
  styleUrls: ['./sell-fund.component.scss'],
  providers: [Service]
})
export class SellFundComponent implements OnInit {
  fundId!: number;
  fundData: any;
  sellAmount: number = 0;
  heldUnits: number = 1500;
  sellAllUnits: boolean = false;
  today: Date = new Date();
  sellSuccess: boolean = false;

  constructor(
      private route: ActivatedRoute, 
      private service: Service,
      private router: Router // ✅ Inject
) {}

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

  updateSellAmount() {
    if (this.sellAllUnits) {
      this.sellAmount = this.heldUnits;
    }
  }

  onAmountChange() {
    if (this.sellAllUnits && this.sellAmount !== this.heldUnits) {
       this.sellAllUnits = false;
    }
  }

  confirmSell() {
    this.sellSuccess = true;
  }

  // ✅ กดตกลงแล้วกลับหน้าแรก
  closeSuccess() {
    this.router.navigate(['/']); 
  }
}