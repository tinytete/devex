import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../app.service';

@Component({
  selector: 'app-buy-fund',
  templateUrl: './buy-fund.component.html',
  styleUrls: ['./buy-fund.component.scss'],

})
export class BuyFundComponent implements OnInit {
  fundId!: number;
  fundData: any;
  purchaseAmount: number = 500; 
  isAgreed: boolean = false;
  today: Date = new Date();
  purchaseSuccess: boolean = false;

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
    });
  }

  get purchaseFee(): number {
    return this.purchaseAmount * 0.01;
  }

  get totalPayment(): number {
    return this.purchaseAmount + this.purchaseFee;
  }

  confirmPurchase() {
    const unitsReceived = this.purchaseAmount / this.fundData.NAV;

    this.service.addTransaction(
        this.fundData.FundName, 
        'BUY', 
        this.purchaseAmount
    );

    this.service.updatePortfolio(
        this.fundId, 
        this.fundData.FundName, 
        unitsReceived, 
        this.fundData.NAV
    );
    
    this.purchaseSuccess = true;
  }

  closeSuccess() {
    this.router.navigate(['/']); 
  }

  navigateTotopchart() { this.router.navigate(['topchart']); }

  navigateToPortfolio() { 
      this.router.navigate(['/']); 
  }
}