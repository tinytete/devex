import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  heldUnits: number = 1500; // Mock: จำนวนหน่วยที่มี
  sellAllUnits: boolean = false;
  today: Date = new Date();
  sellSuccess: boolean = false;

  constructor(private route: ActivatedRoute, private service: Service) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      this.fundId = idString ? +idString : 0;
      this.fundData = this.service.getFundById(this.fundId);
    });
  }

  // คำนวณค่าธรรมเนียม
  calculateFee(amount: number, percentage: number): number {
    if (!amount || amount < 0) return 0;
    return amount * percentage;
  }

  // เมื่อกด Checkbox ขายทั้งหมด
  updateSellAmount() {
    if (this.sellAllUnits) {
      this.sellAmount = this.heldUnits;
    }
    // ถ้าติ๊กออก ไม่ต้องทำอะไร ให้ user แก้ตัวเลขเองได้
  }

  // เมื่อแก้ไขตัวเลขเอง -> ถ้าเลขไม่เท่ากับ Max ให้เอาติ๊กถูกออก
  onAmountChange() {
    if (this.sellAllUnits && this.sellAmount !== this.heldUnits) {
       this.sellAllUnits = false;
    }
  }

  confirmSell() {
    this.sellSuccess = true;
    console.log(`ขายกองทุน ID: ${this.fundId}, จำนวน: ${this.sellAmount}`);
  }
}