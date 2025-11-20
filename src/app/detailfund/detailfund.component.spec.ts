import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailfundComponent } from './detailfund.component';

describe('DetailfundComponent', () => {
  let component: DetailfundComponent;
  let fixture: ComponentFixture<DetailfundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailfundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailfundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
