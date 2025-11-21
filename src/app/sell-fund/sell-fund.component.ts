import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../app.service';

@Component({
  selector: 'app-sell-fund',
  templateUrl: './sell-fund.component.html',
  styleUrl: './sell-fund.component.scss',
  providers: [Service]
})
export class SellFundComponent implements OnInit {
  fundId!: number;
  fundData: any;
  sellAmount: number = 0;
  sellAllUnits: boolean = false;
  today: Date = new Date();
  sellSuccess: boolean = false;
  heldUnits: number = 1500;

  constructor(private route: ActivatedRoute, private service: Service) {}

ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      this.fundId = idString ? +idString : 0;
      this.fundData = this.service.getFundById(this.fundId);
      this.updateSellAmount();
    });
  }
  
  calculateFee(amount: number, percentage: number): number {
    if (!amount || amount < 0) return 0;
    return amount * percentage;
  }

  updateSellAmount(){
    if(this.sellAllUnits) {
      this.sellAmount = this.heldUnits;
    }else if (this.sellAmount > this.heldUnits){
      this.sellAmount = this.heldUnits;
    }
  }

  confirmSell() {
    this.sellSuccess = true;
    console.log(`ยืนยันการขาย ${this.fundData.FundName} จำนวน ${this.sellAmount} หน่วย`);
  }
}