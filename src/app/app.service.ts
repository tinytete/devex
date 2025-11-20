// app.service.ts

import { Injectable } from '@angular/core';

@Injectable()
export class Service {
  // 💡 สร้างข้อมูล Top 10 Fund เอง (เป็น Array of Objects)
  FundName!: string;
  Ranking !: number;

  getTopChartsData() {
    return [
      { 
        Id: 1, 
        FundName: 'SCBBANKINGE',
        NAV: 14.7927,
        Company: 'SCBAM',  
        Ranking: 92, 
        Return1Y: 11.35,
        Category: 'Equity Large Cap',
        AUM: '15,713,053',
        RegisterDate: '28 มิ.ย.2554',
        RiskLevel: '7',
      },
      { 
        Id: 2, 
        FundName: 'SCBBANKING',
        Company: 'SCBAM', 
        Ranking: 91,  
        Return1Y: 10.58, 
        Category: 'Equity Large Cap', 
      },
      { 
        Id: 3, 
        FundName: 'K-BANKING', 
        Company: 'KAsset',  
        Ranking: 91,  
        Return1Y: 10.17, 
        Category: 'Equity Large Cap',  
      },
      { 
        Id: 4, 
        FundName: 'TISCOHD-A', 
        Company: 'TISCOAM',
        Ranking: 75,  
        Return1Y: 5.46,
        Category: 'Equity General',
      },
      { 
        Id: 5, 
        FundName: 'SCBBANKINGA', 
        Company: 'SCBAM',
        Ranking: 63,  
        Return1Y: 10.62, 
        Category: 'Equity Large Cap',  
      },
      { 
        Id: 6, 
        FundName: 'SCBBANKINGP', 
        Company: 'SCBAM',
        Ranking: 41,  
        Return1Y: 6.97, 
        Category: 'Equity Large Cap', 
      },
      { 
        Id: 7, 
        FundName: 'K-ICT',
        Company: 'KAsset', 
        Ranking: 30,  
        Return1Y: 11.06,
        Category: 'Equity General',
      },
      { 
        Id: 8, 
        FundName: 'KT-CLMVT-A', 
        Company: 'KTAM', 
        Ranking: 6,  
        Return1Y: 8.57, 
        Category: 'ASEAN Equity',  
      },
      { 
        Id: 9, 
        FundName: 'KT-CLMVT-D',
        Company: 'KTAM',  
        Ranking: 6, 
        Return1Y: 7.21, 
        Category: 'ASEAN Equity', 
      },
      { 
        Id: 10, 
        FundName: 'ES-FINANCETH',
        Company: 'EASTSPRING', 
        Ranking: 1,  
        Return1Y: 4.99, 
        Category: 'Equity General', 
      }
    ];
  }

getFundById(id: number) {
    const allFunds = this.getTopChartsData();
    // ค้นหา Object ใน Array ที่มี Id ตรงกัน
    return allFunds.find(fund => fund.Id === id);
  }
}