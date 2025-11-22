import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFundComponent } from './manage-fund.component';

describe('ManageFundComponent', () => {
  let component: ManageFundComponent;
  let fixture: ComponentFixture<ManageFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageFundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
