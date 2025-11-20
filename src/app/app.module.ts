import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// นำเข้า AppRoutingModule ถ้ามี (จากโค้ดที่คุณให้มามี AppRoutingModule)
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component'; // นำเข้า Component
// นำเข้า DevExtreme Modules ที่ Component ใช้งาน
import { DxBulletModule, DxTemplateModule } from 'devextreme-angular'; 
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxChartModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    DxDataGridModule, // DevExtreme Data Grid
    DxTemplateModule, // DevExtreme Template
    DxBulletModule,  // DevExtreme Bullet Chart
    DxChartModule,
  ],
  providers: [], // ประกาศ Service ถ้าต้องการให้ใช้ได้ทั้งแอปฯ (แต่คุณประกาศใน Component แล้ว)
  bootstrap: [AppComponent] // บอก Angular ว่าให้เริ่มต้นที่ Component นี้
})
export class AppModule { }

