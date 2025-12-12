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
  ) { }

  ngOnInit(): void {
    this.loadFunds();
  }

  loadFunds() {
    this.service.getTopChartsData().subscribe((data) => {
      this.fundsData = [...data].sort((a, b) => b.Ranking - a.Ranking);
    });
  }

  startAdd() {
    this.isNew = true;
    this.selectedFund = {
      FundName: '',
      Company: '',
      Ranking: 0,
      Return3Y: 0,
      Lastrank: 0,
      Category: '',
      RiskLevel: '',
      NAV: 0,
      AUM: '',
      RegisterDate: '',
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
       
        this.service.addFund(this.selectedFund).subscribe({
          next: (res) => {
            this.finishSave(); 
          },
          error: (err) => {
          }
        });

      } else {
       
        this.service.addFund(this.selectedFund).subscribe({
          next: (res) => {
            this.finishSave(); 
          }
        });
      }
    }
  }

  delete(id: number) {
    const confirmMessage = this.translate.instant('LABEL_SURE') +''+ id + '?';

    if (confirm(confirmMessage)) {
      this.service.deleteFund(id).subscribe(() => {
        this.loadFunds();
        if (this.selectedFund && this.selectedFund.Id === id) {
          this.selectedFund = null;
        }
      });
    }
  }

  finishSave() {
    this.selectedFund = null;
    this.isNew = false;
    this.loadFunds();
  }

  cancel() {
    this.selectedFund = null;
    this.isNew = false;
  }

  navigateToManage() { this.router.navigate(['/manage']); }

  navigateTotopchart() { this.router.navigate(['topchart']); }

  navigateToPortfolio() { this.router.navigate(['/']); }
 
  onRowClick(e: any) {
    if (e.data && e.data.Id) { this.router.navigate(['/detail', e.data.Id]); }
  }
}
