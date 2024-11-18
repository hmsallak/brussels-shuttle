import {Component, EventEmitter, Output} from '@angular/core';
import {faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {PaymentMethodEnum} from "../../../core/models/enum/payment-method.enum";
import {NgClass} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-payment-method-button',
  standalone: true,
  imports: [
    FaIconComponent,
    NgClass,
    TranslateModule
  ],
  templateUrl: './payment-method-button.component.html',
  styleUrl: './payment-method-button.component.css'
})
export class PaymentMethodButtonComponent {

  paymentMethodSelect?: PaymentMethodEnum;

  @Output() paymentMethod = new EventEmitter<PaymentMethodEnum>();

  protected readonly faMoneyBill = faMoneyBill;
  protected readonly PaymentMethod = PaymentMethodEnum;

  selectPaymentMethod(paymentMethod: PaymentMethodEnum) {
    this.paymentMethodSelect = paymentMethod;
    this.paymentMethod.emit(paymentMethod);
  }
}
