import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent {
  languages = [
    { code: 'th', name: 'ไทย', flag: 'assets/images/th.png' },
    { code: 'en', name: 'English', flag: 'assets/images/en.png' },
  ];

  currentLanguage = 'th';

  constructor(private translate: TranslateService) {
    const savedLanguage = localStorage.getItem('language');

    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
      this.translate.use(savedLanguage);
    } else {
      this.translate.use('th');
    }
  }

  switchLanguage(languageCode: string): void {
    this.currentLanguage = languageCode;
    this.translate.use(languageCode);
    localStorage.setItem('language', languageCode);
  }

  getFlag(languageCode: string): string {
    const language = this.languages.find((lang) => lang.code === languageCode);
    return language ? language.flag : '';
  }
}