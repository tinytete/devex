import { Component } from '@angular/core';
import { Service } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'top-chart-fund',
  templateUrl: 'topchartfund.component.html',
  styleUrl: 'topchartfund.component.scss',
})
export class TopchartfundComponent {
  title = 'topchartsfund';
  topChartData: any[] = [];
  chartData: any[] = [];
  allFunds: any[] = [];

  public customizeLabel = (e: any) => { return e.value; }
  public customizeSeriesLabel = (e: any) => { return e.point.data.Company; }

  constructor(service: Service, private router: Router) {
    this.topChartData = service.getTopChartsData();
    this.topChartData.sort((a, b) => b.Ranking - a.Ranking);
    this.chartData = this.topChartData;
    this.allFunds = service.getTopChartsData();

    this.allFunds.sort((a, b) => b.Ranking - a.Ranking);

    this.topChartData = [...this.allFunds];
    this.chartData = this.topChartData;
  }

  customizePoint = (arg: { data: any }) => {
    const company = arg.data.Company;
    switch (company) {
      case 'SCBAM': return { color: '#7D3C98' };      
      case 'KAsset': return { color: '#00A950' };     
      case 'KTAM': return { color: '#18A0FB' };       
      case 'TISCOAM': return { color: '#1A3B70' };    
      case 'EASTSPRING': return { color: '#E35205' }; 
      default: return { color: '#ffa600ff' };           
    }
  }

  navigateToManage() { this.router.navigate(['/manage']); }

  navigateToPortfolio() {
    this.router.navigate(['/']);
  }

  onRowClick(e: any) {
    if (e.data && e.data.Id) {
      this.router.navigate(['/detail', e.data.Id]);
    }
  }

  onPointClick(e: any) {
    const pointData = e.target.data;
    if (pointData && pointData.Id) {
      this.router.navigate(['/detail', pointData.Id]);
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

  navigateTotopchart() { this.router.navigate(['topchart']); }

  onSearch(e: any) {
    const searchText = e.value ? e.value.toLowerCase() : '';

    if (searchText) {
      this.topChartData = this.allFunds.filter(fund =>
        fund.FundName.toLowerCase().includes(searchText)
      );
    } else {
      this.topChartData = [...this.allFunds];
    }
  }
}