import { Component, OnInit } from '@angular/core';
import { Service } from './app.service';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'demo-app',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  providers: [Service],
})
export class AppComponent implements OnInit {
  title = 'topchartsfund';

  constructor(private translate: TranslateService) {
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