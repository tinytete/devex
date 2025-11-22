// src/app/topchartfund/topchartfund.component.ts

import { Component } from '@angular/core';
import { Service } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'top-chart-fund',
  templateUrl: 'topchartfund.component.html',
  styleUrl: 'topchartfund.component.scss',
  providers: [Service],
})
export class TopchartfundComponent {
  title = 'topchartsfund';
  shouldBeDisabled: boolean = true;

  topChartData: any[] = [];
  chartData: any[] = [];

  public customizeLabel = (e:any)=> {
    return e.value;
  }

  public customizeSeriesLabel = (e:any)=> {
    return {
      text : e.point.data.Company ,
      font : { size: 10, weight: 600 }
    };
  }

  constructor(service: Service,private router: Router) {
    this.topChartData = service.getTopChartsData();
    this.topChartData.sort((a,b)=>b.Ranking-a.Ranking);
    this.chartData = this.topChartData;
  }

  // ✅ แก้ไข: ชื่อฟังก์ชันที่ถูกต้องตรงกับ HTML
  navigateToManage() { 
    this.router.navigate(['/manage']);
  }

  onRowClick(e:any) {
    if(e.data && e.data.Id){
      const fundId = e.data.Id;
      this.router.navigate(['/detail', fundId]);
    }
  }

  onPointClick(e:any) {
    const pointData = e.target.data;
    if(pointData && pointData.Id) {
      this.router.navigate(['/detail',pointData.Id]);
    }
  }

  // ✅ เพิ่ม: ฟังก์ชัน navigateToBuy
  navigateToBuy(fundId: number | null) {
      if (fundId) {
          this.router.navigate(['/buy', fundId]);
      } else {
          // กรณีคลิกจากปุ่ม Header (My Port/Bundle Buy)
          console.log("Navigating to Buy Page (My Port/Bundle)");
          // สามารถ navigate ไปที่หน้า Buy โดยไม่มี ID ได้ หรือกำหนด Route แยก
          // this.router.navigate(['/buy/all']); 
      }
  }

  // ✅ เพิ่ม: ฟังก์ชัน navigateToSell
  navigateToSell(fundId: number | null) {
      if (fundId) {
          this.router.navigate(['/sell', fundId]);
      } else {
          // กรณีคลิกจากปุ่ม Header (My Port/Bundle Sell)
          console.log("Navigating to Sell Page (My Port/Bundle)");
          // this.router.navigate(['/sell/all']); 
      }
  }
}