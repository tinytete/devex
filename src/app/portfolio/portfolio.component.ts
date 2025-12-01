import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { Service } from '../app.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit { 
  portfoliotData: any[] = [];
  allPortfolioData: any[] = [];
  transactionData: any[] = []; 
  
  constructor(private service: Service, private router: Router) {}

  ngOnInit(): void {
    
    this.allPortfolioData = this.service.getPortfolio();
    this.portfoliotData = [...this.allPortfolioData];

    
    this.transactionData = this.service.getTransactions();
  }

  onSearchPortfolio(e: any) {
    const searchText = e.value ? e.value.toLowerCase() : '';

    if (searchText) {
      this.portfoliotData = this.allPortfolioData.filter(item => 
        item.FundName.toLowerCase().includes(searchText)
      );
    } else {
      this.portfoliotData = [...this.allPortfolioData];
    }
  }

  customizeLabel(arg: any) {
    return arg.percentText; 
  }

  customizeTooltip(arg: any) {
    return {
        text: `${arg.argumentText}: ${arg.valueText} บาท`
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

  navigateToManage() { this.router.navigate(['/manage']); }
  
  
}