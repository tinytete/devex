import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../app.service';
import { Fund } from '../fund';

@Component({
  selector: 'app-manage-fund',
  templateUrl: './manage-fund.component.html',
  styleUrls: ['./manage-fund.component.scss'],
  providers: [Service]
})
export class ManageFundComponent implements OnInit {
  fundsData: Fund[] = [];
  selectedFund: any = null; // เปลี่ยน Type เป็น any ชั่วคราวเพื่อให้ยืดหยุ่นกับ Date
  isNew: boolean = false;

  constructor(private service: Service, private router: Router) {}

  ngOnInit(): void {
    this.loadFunds();
  }

  loadFunds() {
    this.fundsData = this.service.getTopChartsData();
  }

  // --- CRUD Functions ---

  startAdd() {
    this.isNew = true;
    this.selectedFund = {
      Id: 0,
      FundName: '',
      Company: '',
      NAV: 0,
      Category: '',
      RiskLevel: '',
      RegisterDate: new Date() // Date Box ต้องการ Date Object
    };
    this.scrollToForm();
  }

  startEdit(fund: Fund) {
    this.isNew = false;
    // Clone ข้อมูลออกมา
    this.selectedFund = { ...fund };
    
    // แปลง String วันที่ เป็น Date Object (ถ้าจำเป็น) เพื่อให้ dx-date-box แสดงผลถูก
    // สมมติว่าใน Mock Data เป็น String 'dd/mm/yyyy' อาจต้องแปลง หรือถ้าเป็น mock ง่ายๆ ปล่อยไว้ก่อนได้
    // this.selectedFund.RegisterDate = new Date(); // Mock ไว้ก่อนเพื่อกัน error
    
    this.scrollToForm();
  }

  save() {
    if (this.selectedFund) {
      // แปลง Date กลับเป็น String สวยๆ ก่อนบันทึก (ถ้าต้องการ)
      // หรือส่งไปทั้งอย่างนั้นเลยก็ได้ตาม Interface
      
      if (this.isNew) {
        this.service.addFund(this.selectedFund);
      } else {
        this.service.updateFund(this.selectedFund);
      }
      
      this.selectedFund = null;
      this.isNew = false;
      this.loadFunds(); 
    }
  }

  delete(id: number) {
    if(confirm('ยืนยันการลบข้อมูล ID ' + id + '?')) {
      this.service.deleteFund(id);
      this.loadFunds();
      if (this.selectedFund && this.selectedFund.Id === id) {
        this.selectedFund = null;
      }
    }
  }

  cancel() {
    this.selectedFund = null;
    this.isNew = false;
  }

  // Helper: เลื่อนหน้าจอลงมาที่ฟอร์ม
  scrollToForm() {
    setTimeout(() => {
        const element = document.getElementById('edit-form');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}