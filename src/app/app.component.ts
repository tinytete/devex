import { Component, OnInit } from '@angular/core';
import { Service } from './app.service';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'demo-app', // ⚠️ เช็ค index.html ด้วยนะครับว่าใช้ <demo-app> หรือ <app-root>
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss', // ถ้า Angular รุ่นเก่าอาจต้องใช้ styleUrls (มี s)
  providers: [Service],
})
export class AppComponent implements OnInit {
  title = 'topchartsfund';

  constructor(private translate: TranslateService) {
     // ควรตั้งค่า default lang ไว้กันเหนียว
     translate.setDefaultLang('th');
     translate.use('th');
  }

  
  ngOnInit() {
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
      this.translate.use(storedLang);
    } else {
      this.translate.use('th');
      localStorage.setItem('language', 'th');
    }
  }
}
