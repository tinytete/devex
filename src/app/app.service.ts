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
        NAV: 14.8152,
        Company: 'SCBAM',  
        Ranking: 92, 
        Return1Y: 11.35,
        Category: 'Equity Large Cap',
        AUM: '15,582,890',
        RegisterDate: '28 มิ.ย. 2554',
        RiskLevel: '7',
      },
      { 
        Id: 2, 
        FundName: 'SCBBANKING',
        NAV: 9.8621,
        Company: 'SCBAM', 
        Ranking: 91,  
        Return1Y: 10.58, 
        Category: 'Equity Large Cap', 
        AUM: '990,632,271',
        RegisterDate: '28 มิ.ย. 2554',
        RiskLevel: '7',
      },
      { 
        Id: 3, 
        FundName: 'K-BANKING', 
        NAV: 14.9691,
        Company: 'KAsset',  
        Ranking: 91,  
        Return1Y: 10.17, 
        Category: 'Equity Large Cap',
        AUM: '354,575,155',
        RegisterDate: '15 ก.ย. 2558',
        RiskLevel: '7',  
      },
      { 
        Id: 4, 
        FundName: 'TISCOHD-A', 
        NAV: 22.5052,
        Company: 'TISCOAM',
        Ranking: 75,  
        Return1Y: 5.46,
        Category: 'Equity General',
        AUM: '1,245,525,837',
        RegisterDate: '18 ก.ค. 2555',
        RiskLevel: '6',
      },
      { 
        Id: 5, 
        FundName: 'SCBBANKINGA',
        NAV: 14.3055, 
        Company: 'SCBAM',
        Ranking: 63,  
        Return1Y: 10.62, 
        Category: 'Equity Large Cap', 
        AUM: '190,512,174',
        RegisterDate: '02 เม.ย. 2561',
        RiskLevel: '7', 
      },
      { 
        Id: 6, 
        FundName: 'SCBBANKINGP',
        NAV: 10.4229, 
        Company: 'SCBAM',
        Ranking: 41,  
        Return1Y: 6.97, 
        Category: 'Equity Large Cap', 
        AUM: '0',
        RegisterDate: '21 ส.ค. 2560',
        RiskLevel: '7',
      },
      { 
        Id: 7, 
        FundName: 'K-ICT',
        NAV: 13.5028,
        Company: 'KAsset', 
        Ranking: 30,  
        Return1Y: 11.06,
        Category: 'Equity General',
        AUM: '141,301,476',
        RegisterDate: '29 พ.ค. 2558',
        RiskLevel: '7',
      },
      { 
        Id: 8, 
        FundName: 'KT-CLMVT-A', 
        NAV: 14.1064,
        Company: 'KTAM', 
        Ranking: 6,  
        Return1Y: 8.57, 
        Category: 'ASEAN Equity',  
        AUM: '332,928,199',
        RegisterDate: '28 ก.พ. 2560',
        RiskLevel: '6',
      },
      { 
        Id: 9, 
        FundName: 'KT-CLMVT-D',
        NAV: 14.1064,
        Company: 'KTAM',  
        Ranking: 6, 
        Return1Y: 7.21, 
        Category: 'ASEAN Equity', 
        AUM: '332,928,199',
        RegisterDate: '28 ก.พ. 2560',
        RiskLevel: '6',
      },
      { 
        Id: 10, 
        FundName: 'ES-FINANCETH',
        NAV: 17.2441,
        Company: 'EASTSPRING', 
        Ranking: 1,  
        Return1Y: 4.99, 
        Category: 'Equity General', 
        AUM: '40,039,921',
        RegisterDate: '17 พ.ย. 2558',
        RiskLevel: '7',
      }
    ];
  }

getFundById(id: number) {
    const allFunds = this.getTopChartsData();
    // ค้นหา Object ใน Array ที่มี Id ตรงกัน
    return allFunds.find(fund => fund.Id === id);
  }
}