import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../app.service';

@Component({
  selector: 'app-sell-fund',
  templateUrl: './sell-fund.component.html',
  styleUrls: ['./sell-fund.component.scss'],
})

export class SellFundComponent implements OnInit {
  fundId!: number;
  fundData: any;
  sellAmount: number = 0; 
  heldUnits: number = 0;  
  sellAllUnits: boolean = false;
  today: Date = new Date();
  sellSuccess: boolean = false;

  constructor(
      private route: ActivatedRoute, 
      private service: Service,
      private router: Router
) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      this.fundId = idString ? +idString : 0;
      this.fundData = this.service.getFundById(this.fundId);

      const portfolioItem = this.service.getPortfolio().find(p => p.FundId === this.fundId);
      this.heldUnits = portfolioItem ? portfolioItem.Units : 0;
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
    const sellValueInBaht = this.sellAmount * this.fundData.NAV;

    this.service.addTransaction(
        this.fundData.FundName,
        'SELL',
        sellValueInBaht
    );

    this.service.updatePortfolio(
        this.fundId,
        this.fundData.FundName,
        -this.sellAmount, 
        this.fundData.NAV
    );

    this.sellSuccess = true;
  }

  closeSuccess() {
    this.router.navigate(['/']); 
  }

  navigateTotopchart() {}

  navigateToPortfolio() { 
      this.router.navigate(['/']); 
  }
}