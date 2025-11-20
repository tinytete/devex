import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyFundComponent } from './buy-fund.component';

describe('BuyFundComponent', () => {
  let component: BuyFundComponent;
  let fixture: ComponentFixture<BuyFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyFundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
