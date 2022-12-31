import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiligramReviewComponent } from './miligram-review.component';

describe('MiligramReviewComponent', () => {
  let component: MiligramReviewComponent;
  let fixture: ComponentFixture<MiligramReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiligramReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiligramReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
