import {Component, EventEmitter, Output} from '@angular/core';
import {faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {PaymentMethodEnum} from "../../../core/models/enum/payment-method.enum";

@Component({
  selector: 'app-payment-method-button',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './payment-method-button.component.html',
  styleUrl: './payment-method-button.component.css'
})
export class PaymentMethodButtonComponent {

  @Output() paymentMethod = new EventEmitter<PaymentMethodEnum>();

  protected readonly faMoneyBill = faMoneyBill;
  protected readonly PaymentMethod = PaymentMethodEnum;
}
