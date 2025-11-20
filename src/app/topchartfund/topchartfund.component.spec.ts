import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopchartfundComponent } from './topchartfund.component';

describe('TopchartfundComponent', () => {
  let component: TopchartfundComponent;
  let fixture: ComponentFixture<TopchartfundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopchartfundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopchartfundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
