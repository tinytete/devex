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
  sellAmount: number = 0; // จำนวนหน่วยที่จะขาย
  heldUnits: number = 0;  // เปลี่ยนค่าเริ่มต้นเป็น 0 (เดี๋ยวไปดึงของจริงมาใส่)
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

      // ✅ ดึงข้อมูลจริงจากพอร์ตมาโชว์ว่ามีกี่หน่วย (ถ้าไม่มีก็คือ 0)
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
    // คำนวณมูลค่าที่ขาย (บาท) = หน่วยที่ขาย * ราคา NAV
    const sellValueInBaht = this.sellAmount * this.fundData.NAV;

    // 1. บันทึกประวัติการขาย (Transaction)
    this.service.addTransaction(
        this.fundData.FundName,
        'SELL',
        sellValueInBaht
    );

    // 2. อัปเดตพอร์ตโฟลิโอ (ลดหน่วยลงทุน)
    this.service.updatePortfolio(
        this.fundId,
        this.fundData.FundName,
        -this.sellAmount, // ⚠️ สำคัญ: ใส่เครื่องหมายลบ เพื่อบอกว่า "ขายออก"
        this.fundData.NAV
    );

    // 3. แสดง Popup สำเร็จ
    this.sellSuccess = true;
  }

  closeSuccess() {
    this.router.navigate(['/']); 
  }
}