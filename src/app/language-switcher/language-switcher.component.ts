import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent {
  languages = [
    // ✅ 1. แก้ตรงนี้: เปลี่ยนจาก Emoji เป็น Path ไฟล์รูปภาพ
    // (ต้องมั่นใจว่ามีรูป th.png และ en.png อยู่ในโฟลเดอร์ src/assets/images/ นะครับ)
    { code: 'th', name: 'ไทย', flag: 'assets/images/th.png' },
    { code: 'en', name: 'English', flag: 'assets/images/en.png' },
  ];

  currentLanguage = 'th';

  constructor(private translate: TranslateService) {
    const savedLanguage = localStorage.getItem('language');
    
    if (savedLanguage) {
      // ✅ 2. แก้ตรงนี้: ลบเครื่องหมาย ' ' ออก เพื่อใช้ค่าจากตัวแปรจริงๆ
      this.currentLanguage = savedLanguage;
      this.translate.use(savedLanguage); 
    } else {
      // ถ้าไม่มีค่าเก่า ให้ใช้ภาษาไทยเป็นค่าเริ่มต้น
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
    return language ? language.flag : ''; // คืนค่า Path รูปภาพ
  }
}