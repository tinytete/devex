import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// DevExtreme Modules
import { 
  DxBulletModule, DxTemplateModule, DxChartModule, DxDataGridModule, 
  DxTextBoxModule, DxButtonModule, DxAutocompleteModule, 
  DxNumberBoxModule, DxCheckBoxModule, DxDateBoxModule 
} from 'devextreme-angular';

// Components
import { TopchartfundComponent } from './topchartfund/topchartfund.component';
import { DetailfundComponent } from './detailfund/detailfund.component';
import { SellFundComponent } from './sell-fund/sell-fund.component';
import { BuyFundComponent } from './buy-fund/buy-fund.component';
import { ManageFundComponent } from './manage-fund/manage-fund.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';

// Translation
import { TranslateLoader, TranslateModule, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MyMissingTranslationHandler } from "./language.service";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    TopchartfundComponent,
    DetailfundComponent,
    SellFundComponent,
    BuyFundComponent,
    ManageFundComponent,
    LanguageSwitcherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxChartModule,
    DxTextBoxModule,
    DxButtonModule,
    DxNumberBoxModule,
    DxCheckBoxModule,
    DxDateBoxModule,
    DxAutocompleteModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MyMissingTranslationHandler,
      },
    }),
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }