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
  topChartData: any[] = [];
  chartData: any[] = [];

  public customizeLabel = (e:any)=> { return e.value; }
  public customizeSeriesLabel = (e: any) => { return e.point.data.Company; }

  constructor(service: Service, private router: Router) {
    this.topChartData = service.getTopChartsData();
    this.topChartData.sort((a,b)=>b.Ranking-a.Ranking);
    this.chartData = this.topChartData;
  }

  navigateToManage() { this.router.navigate(['/manage']); }

  // ✅ เพิ่มฟังก์ชันนี้: กดแล้วไปหน้า Portfolio (หน้าแรก)
  navigateToPortfolio() { 
      this.router.navigate(['/']); 
  }

  onRowClick(e:any) {
    if(e.data && e.data.Id){
      this.router.navigate(['/detail', e.data.Id]);
    }
  }

  onPointClick(e:any) {
    const pointData = e.target.data;
    if(pointData && pointData.Id) {
      this.router.navigate(['/detail',pointData.Id]);
    }
  }

  navigateToBuy(fundId: number | null) {
      if (fundId) {
          this.router.navigate(['/buy', fundId]);
      }
  }

  onBuyClick(e: any, fundId: number) {
    if (e && e.event) {
      e.event.stopPropagation();
    }
    this.navigateToBuy(fundId);
  }
}