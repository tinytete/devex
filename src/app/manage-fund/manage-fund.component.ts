import { Component, OnInit } from '@angular/core';
import { Service } from '../app.service';
import { Fund } from '../fund'; // อย่าลืม import Interface Fund

@Component({
  selector: 'app-manage-fund',
  templateUrl: './manage-fund.component.html',
  styleUrls: ['./manage-fund.component.scss'], // แก้ styleUrl เป็น styleUrls (มี s)
  providers: [Service]
})
export class ManageFundComponent implements OnInit {
  fundsData: Fund[] = [];
  selectedFund: Fund | null = null;
  isNew: boolean = false;

  constructor(private service: Service) {}

  ngOnInit(): void {
    this.loadFunds();
  }
  loadFunds() {
    throw new Error('Method not implemented.');
  }

  // 1. กดปุ่ม "เพิ่มข้อมูลใหม่"
  startAdd() {
    this.isNew = true;
    this.selectedFund = {
      Id: 0, // เดี๋ยว Service รัน ID ให้
      FundName: '',
      Company: '',
      NAV: 0,
      Ranking: 0,
      Return1Y: 0,
      Category: '',
      AUM: '',
      RegisterDate: new Date().toLocaleDateString('th-TH'),
      RiskLevel: '1'
    };
  }

  // 2. กดปุ่ม "แก้ไข" (ดึงข้อมูลมาใส่ Form)
  startEdit(fund: Fund) {
    this.isNew = false;
    // Clone ข้อมูลออกมา เพื่อไม่ให้กระทบตารางทันทีระหว่างพิมพ์ (ต้องกด Save ก่อนถึงจะเปลี่ยน)
    this.selectedFund = { ...fund }; 
  }

  // 3. กดปุ่ม "บันทึก" (Save)
  save() {
    if (this.selectedFund) {
      if (this.isNew) {
        // กรณีเพิ่มใหม่
        this.service.addFund(this.selectedFund);
      } else {
        // กรณีแก้ไข
        this.service.updateFund(this.selectedFund);
      }
      
      // รีเซ็ตค่าและโหลดตารางใหม่
      this.selectedFund = null;
      this.isNew = false;
      this.loadFunds(); 
    }
  }

  // 4. กดปุ่ม "ลบ" (Delete)
  delete(id: number) {
    if(confirm('ยืนยันที่จะลบข้อมูลนี้?')) {
      this.service.deleteFund(id);
      this.loadFunds();
      // ถ้าลบตัวที่กำลังแก้ไขอยู่ ให้ปิดฟอร์มทิ้ง
      if (this.selectedFund && this.selectedFund.Id === id) {
        this.selectedFund = null;
      }
    }
  }

  // 5. กดปุ่ม "ยกเลิก"
  cancel() {
    this.selectedFund = null;
    this.isNew = false;
  }
}