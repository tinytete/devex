import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellFundComponent } from './sell-fund.component';

describe('SellFundComponent', () => {
  let component: SellFundComponent;
  let fixture: ComponentFixture<SellFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellFundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
