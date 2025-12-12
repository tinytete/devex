import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../app.service';

@Component({
  selector: 'app-detailfund',
  templateUrl: './detailfund.component.html',
  styleUrl: './detailfund.component.scss',
})
export class DetailfundComponent implements OnInit {
  fundId: number | undefined;
  fundData: any;
  navHistoryData: any[] = [];
  performanceData: any[] = [];

  constructor(private route: ActivatedRoute,
    private service: Service,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      this.fundId = idString ? + idString : undefined;

      if (this.fundId) {
        this.service.getFundById(this.fundId).subscribe({
          next: (data) => {
            this.fundData = data;

            if (this.fundData) {
              this.loadMockData(this.fundId!);
            }
          },
          error: (err) => {
            console.error('Error fetching fund data:', err);
          }
        });
      }
    });
  }

  navigateToBuy() {
    if (this.fundId) {
      this.router.navigate(['/buy', this.fundId]);
    }
  }

  navigateToSell() {
    if (this.fundId) {
      this.router.navigate(['/sell', this.fundId]);
    }
  }

  navigateToFav() {
    if (this.fundId) {
      return;
    }
  }

  loadMockData(id: number) {
    this.navHistoryData = [
      { Date: new Date(2024, 0, 1), NAV: 14.0000 },
      { Date: new Date(2024, 3, 1), NAV: 14.2500 },
      { Date: new Date(2024, 6, 1), NAV: 14.7927 },
      { Date: new Date(2024, 9, 1), NAV: 14.9000 },
      { Date: new Date(2024, 11, 1), NAV: 15.1000 },
    ];

    this.performanceData = [{
      Fundname: this.fundData.FundName,
      R_1D: -0.10,
      R_1M: 2.28,
      R_1Y: 23.25,
      R_3Y: 12.35,
      R_5Y: 14.38,
    }];
  }

  navigateToManage() { this.router.navigate(['/manage']); }

  navigateTotopchart() { this.router.navigate(['topchart']); }

  navigateToPortfolio() { this.router.navigate(['/']); }
}