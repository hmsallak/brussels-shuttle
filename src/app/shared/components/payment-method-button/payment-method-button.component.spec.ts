import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodButtonComponent } from './payment-method-button.component';

describe('PaymentMethodButtonComponent', () => {
  let component: PaymentMethodButtonComponent;
  let fixture: ComponentFixture<PaymentMethodButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMethodButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMethodButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
