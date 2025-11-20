import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopchartfundComponent } from './topchartfund/topchartfund.component';
import { DetailfundComponent } from './detailfund/detailfund.component';
import { SellFundComponent } from './sell-fund/sell-fund.component';
import { BuyFundComponent } from './buy-fund/buy-fund.component';

const routes: Routes = [
{path: '', component: TopchartfundComponent},
{path: 'detail/:id', component: DetailfundComponent},
{ path: 'buy/:id', component: BuyFundComponent },
{ path: 'sell/:id', component: SellFundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
