import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopchartfundComponent } from './topchartfund/topchartfund.component';

const routes: Routes = [
{path: '', component: TopchartfundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
