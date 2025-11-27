// src/app/portfolio/portfolio.component.ts
import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { Service } from '../app.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  providers: [Service],
})
export class PortfolioComponent implements OnInit { 
  portfoliotData: any[] = [];
  
  constructor(private service: Service, private router: Router) {}

  ngOnInit(): void {
    this.portfoliotData = this.service.getPortfolio();
  }

  // ✅ ฟังก์ชันสำหรับ Label: ให้โชว์ชื่อกองทุน (Argument)
  customizeLabel(arg: any) {
    return arg.argumentText; 
  }

  // ✅ ฟังก์ชันสำหรับ Tooltip: ให้โชว์ % (Percent)
  customizeTooltip(arg: any) {
    return {
        text: arg.percentText // DevExtreme คำนวณ % มาให้แล้วในตัวแปรนี้
    };
  }

  pointClickHandler(e:any) {
    this.toggleVisibility(e.target);
  }

  legendClickHandler(e:any) {
    const arg = e.target;
    const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];
    this.toggleVisibility(item);
  }

  toggleVisibility(item:any) {
    item.isVisible() ? item.hide() : item.show();
  }

  navigateTotopchart() { this.router.navigate(['topchart']); }
  
}