import { Fund, PortfolioItem } from './fund';

export const FUNDS: Fund[] = [
    { Id: 1, FundName: 'SCBBANKINGE', NAV: 14.8152, Company: 'SCBAM', Ranking: 92, Return3Y: 11.35, Lastrank: 1, Category: 'Equity Large Cap', AUM: '15,582,890', RegisterDate: '28 มิ.ย. 2554', RiskLevel: '7' },
    { Id: 2, FundName: 'SCBBANKING', NAV: 9.8621, Company: 'SCBAM', Ranking: 91, Return3Y: 10.58, Lastrank: 3, Category: 'Equity Large Cap', AUM: '990,632,271', RegisterDate: '28 มิ.ย. 2554', RiskLevel: '7' },
    { Id: 3, FundName: 'K-BANKING', NAV: 14.9691, Company: 'KAsset', Ranking: 91, Return3Y: 10.17, Lastrank: 2, Category: 'Equity Large Cap', AUM: '354,575,155', RegisterDate: '15 ก.ย. 2558', RiskLevel: '7' },
    { Id: 4, FundName: 'TISCOHD-A', NAV: 22.5052, Company: 'TISCOAM', Ranking: 75, Return3Y: 5.46, Lastrank: 4, Category: 'Equity General', AUM: '1,245,525,837', RegisterDate: '18 ก.ค. 2555', RiskLevel: '6' },
    { Id: 5, FundName: 'SCBBANKINGA', NAV: 14.3055, Company: 'SCBAM', Ranking: 63, Return3Y: 10.62, Lastrank: 5, Category: 'Equity Large Cap', AUM: '190,512,174', RegisterDate: '02 เม.ย. 2561', RiskLevel: '7' },
    { Id: 6, FundName: 'SCBBANKINGP', NAV: 10.4229, Company: 'SCBAM', Ranking: 41, Return3Y: 6.97, Lastrank: 6, Category: 'Equity Large Cap', AUM: '0', RegisterDate: '21 ส.ค. 2560', RiskLevel: '7' },
    { Id: 7, FundName: 'K-ICT', NAV: 13.5028, Company: 'KAsset', Ranking: 30, Return3Y: 11.06, Lastrank: 7, Category: 'Equity General', AUM: '141,301,476', RegisterDate: '29 พ.ค. 2558', RiskLevel: '7' },
    { Id: 8, FundName: 'KT-CLMVT-A', NAV: 14.1064, Company: 'KTAM', Ranking: 6, Return3Y: 8.57, Lastrank: 8, Category: 'ASEAN Equity', AUM: '332,928,199', RegisterDate: '28 ก.พ. 2560', RiskLevel: '6' },
    { Id: 9, FundName: 'KT-CLMVT-D', NAV: 14.1064, Company: 'KTAM', Ranking: 6, Return3Y: 7.21, Lastrank: 9, Category: 'ASEAN Equity', AUM: '332,928,199', RegisterDate: '28 ก.พ. 2560', RiskLevel: '6' },
    { Id: 10, FundName: 'ES-FINANCETH', NAV: 17.2441, Company: 'EASTSPRING', Ranking: 1, Return3Y: 4.99, Lastrank: 11, Category: 'Equity General', AUM: '40,039,921', RegisterDate: '17 พ.ย. 2558', RiskLevel: '7' }
];

export const MyPortfolio: PortfolioItem[] = [
    // ลงทุนประมาณ 1,000 บาท
    { FundId: 7, Company: 'KAsset', FundName: 'K-ICT', NAV: 13.5028, Units: 74.0587, TotalValue: 1000.00, LastUpdate: new Date() },
    
    // ลงทุนขั้นต่ำ 500 บาท
    { FundId: 5, Company: 'SCBAM', FundName: 'SCBBANKINGA', NAV: 14.3055, Units: 34.9515, TotalValue: 500.00, LastUpdate: new Date() },
    
    // ลงทุนประมาณ 2,500 บาท
    { FundId: 2, Company: 'SCBAM', FundName: 'SCBBANKING', NAV: 9.8621, Units: 253.4957, TotalValue: 2500.00, LastUpdate: new Date() },
    
    // ลงทุนประมาณ 1,500 บาท
    { FundId: 9, Company: 'KTAM', FundName: 'KT-CLMVT-D', NAV: 14.1064, Units: 106.3347, TotalValue: 1500.00, LastUpdate: new Date() },
    
    // ลงทุนประมาณ 5,000 บาท
    { FundId: 1, Company: 'SCBAM', FundName: 'SCBBANKINGE', NAV: 14.8152, Units: 337.4912, TotalValue: 5000.00, LastUpdate: new Date() }
];