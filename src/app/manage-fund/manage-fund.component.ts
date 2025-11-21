import { Component, OnInit } from '@angular/core';
import { Service } from '../app.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'app-manage-fund',
  templateUrl: './manage-fund.component.html',
  styleUrl: './manage-fund.component.scss',
  providers: [Service]
})
export class ManageFundComponent implements OnInit {
  fundsData: any[] = [];
  
  constructor(private service: Service) {}

  ngOnInit(): void {
    // ดึงข้อมูลทั้งหมดมาแสดงในตาราง
    this.fundsData = this.service.getTopChartsData();
  }

  // C - Create: DevExtreme DataGrid จะมี event สำหรับเพิ่มข้อมูลใหม่
  onRowInserting(e: DxDataGridTypes.RowInsertingEvent) {
    this.service.addFund(e.data);
    e.cancel = true; // หยุดการทำงานซ้ำของ DataGrid
  }

  // U - Update: DevExtreme DataGrid จะมี event สำหรับแก้ไขข้อมูล
  onRowUpdating(e: DxDataGridTypes.RowUpdatingEvent) {
    // ผสานข้อมูลใหม่เข้ากับข้อมูลเดิม
    const updatedFund = { ...e.oldData, ...e.newData };
    this.service.updateFund(updatedFund);
    e.cancel = true; // หยุดการทำงานซ้ำของ DataGrid
  }

  // D - Delete: DevExtreme DataGrid จะมี event สำหรับลบข้อมูล
  onRowRemoving(e: DxDataGridTypes.RowRemovingEvent) {
    this.service.deleteFund(e.data.Id);
    e.cancel = true; // หยุดการทำงานซ้ำของ DataGrid
  }
}