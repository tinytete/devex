import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopchartfundComponent } from './topchartfund/topchartfund.component';
import { DetailfundComponent } from './detailfund/detailfund.component';

const routes: Routes = [
{path: '', component: TopchartfundComponent},
{path: 'detail/:id', component: DetailfundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
