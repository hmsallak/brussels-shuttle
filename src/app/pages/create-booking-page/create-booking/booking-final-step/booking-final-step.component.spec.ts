import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFinalStepComponent } from './booking-final-step.component';

describe('BookingFinalStepComponent', () => {
  let component: BookingFinalStepComponent;
  let fixture: ComponentFixture<BookingFinalStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingFinalStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingFinalStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
