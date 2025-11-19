import { Component, enableProdMode } from '@angular/core';
import { DataSource } from 'devextreme-angular/common/data';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { Service } from './app.service';

@Component({
  selector: 'demo-app',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  providers: [Service],
})
export class AppComponent {
  title = 'topchartsfund';

  topChartData: any[] = [];
  chartData: any[] = [];

  // collapsed = false;

  public customizeLabel = (e:any)=> {
    return {text: e.data.Company};
  }

  // customizeSeries(e:any) {
  //   return null;
  // }

  constructor(service: Service) {
    this.topChartData = service.getTopChartsData();
    this.chartData = this.topChartData;
  }
}
