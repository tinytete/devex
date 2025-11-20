import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopchartSearchComponent } from './topchart-search.component';

describe('TopchartSearchComponent', () => {
  let component: TopchartSearchComponent;
  let fixture: ComponentFixture<TopchartSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopchartSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopchartSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
