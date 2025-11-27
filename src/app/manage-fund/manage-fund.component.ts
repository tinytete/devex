import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../app.service';
import { Fund } from '../fund';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-manage-fund',
  templateUrl: './manage-fund.component.html',
  styleUrls: ['./manage-fund.component.scss'],
})
export class ManageFundComponent implements OnInit {
  fundsData: Fund[] = [];
  selectedFund: any = null;
  isNew: boolean = false;

  constructor(
    private service: Service, 
    private router: Router,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.loadFunds();
  }

  loadFunds() {
    this.fundsData = this.service.getTopChartsData();
  }

  startAdd() {
    this.isNew = true;
    this.selectedFund = {
      Id: 0,
      FundName: '',
      Company: '',
      NAV: 0,
      Category: '',
      RiskLevel: '',
      RegisterDate: new Date()
    };
    this.scrollToForm();
  }

  scrollToForm() {
      setTimeout(() => {
          const element = document.getElementById('edit-form');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

  startEdit(fund: Fund) {
    this.isNew = false;
    this.selectedFund = { ...fund };
    this.scrollToForm();
  }

  save() {
    if (this.selectedFund) {
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
    const confirmMessage = this.translate.instant('LABEL_SURE')+ id + '?';

    if(confirm(confirmMessage)) {
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

  navigateTotopchart() { this.router.navigate(['topchart']); }
  
}