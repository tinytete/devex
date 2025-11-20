import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../app.service';

@Component({
  selector: 'app-detailfund',
  templateUrl: './detailfund.component.html',
  styleUrl: './detailfund.component.scss'
})
export class DetailfundComponent implements OnInit {
  fundId: number | undefined;
  fundData: any;
  navHistoryData: any[] = [];
  performanceData: any[] = [];

  constructor(private route: ActivatedRoute,
    private service: Service
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      this.fundId = idString? + idString : undefined;
      
      if(this.fundId){
        this.fundData = this.service.getFundById(this.fundId);

        if(this.fundData) {
          this.loadMockData(this.fundId);
        }
      }
    });
  }

  loadMockData(id: number) {
    // 💡 ฟังก์ชันจำลอง: ในการใช้งานจริงต้องเรียก API/Service เพื่อดึงข้อมูลจริง
    this.navHistoryData = [
        { Date: new Date(2024, 0, 1), NAV: 14.0000 },
        { Date: new Date(2024, 3, 1), NAV: 14.2500 },
        { Date: new Date(2024, 6, 1), NAV: 14.7927 },
        { Date: new Date(2024, 9, 1), NAV: 14.9000 },
        { Date: new Date(2024, 11, 1), NAV: 15.1000 },
    ];

    this.performanceData = [
        { Period: '3 เดือน', FundReturn: '4.36%', BenchmarkReturn: '3.12%' },
        { Period: '6 เดือน', FundReturn: '6.80%', BenchmarkReturn: '5.50%' },
        { Period: '1 ปี', FundReturn: '13.13%', BenchmarkReturn: '10.00%' },
        // ...
    ];
  }
}
