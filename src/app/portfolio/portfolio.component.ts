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
  portfoliotData: any[] = []; // ชื่อตัวแปรนี้ตรงกับ HTML แล้ว ไม่ต้องแก้
  
  constructor(private service: Service, private router: Router) {}

  ngOnInit(): void {
    // ✅ แก้ตรงนี้: เรียก getPortfolio() (ลบ t ตัวท้ายออก)
    this.portfoliotData = this.service.getPortfolio();
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
    if (item.isVisible()) {
      item.hide();
    } else {
      item.show();
    }
  }

  navigateToManage() { this.router.navigate(['/manage']); }
}