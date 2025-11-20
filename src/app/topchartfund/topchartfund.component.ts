import { Component, enableProdMode } from '@angular/core';
import { DataSource } from 'devextreme-angular/common/data';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { Service } from '../app.service';

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

  constructor(service: Service) {
    this.topChartData = service.getTopChartsData();
    this.topChartData.sort((a,b)=>b.Ranking-a.Ranking);
    this.chartData = this.topChartData;
  }
}
