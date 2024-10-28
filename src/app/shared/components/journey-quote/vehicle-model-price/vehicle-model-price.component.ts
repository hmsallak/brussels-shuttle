import {Component, Input} from '@angular/core';
import {VehicleModelPrice} from "../../../../core/models/quote";
import {faChevronDown, faLuggageCart, faSuitcase, faUser} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormControl} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-vehicle-model-price',
  standalone: true,
  imports: [
    FaIconComponent,
    NgClass
  ],
  templateUrl: './vehicle-model-price.component.html',
  styleUrl: './vehicle-model-price.component.css'
})
export class VehicleModelPriceComponent {

  private _vehicleModelPrice!: VehicleModelPrice;

  @Input()
  set vehicleModelPrice(vehicleModelPrice: VehicleModelPrice) {
    this._vehicleModelPrice = vehicleModelPrice;
  }

  @Input() passengerCount: number = 1;

  @Input()
  vehicleModelIdForm: FormControl = new FormControl();

  get vehicleModelPrice(): VehicleModelPrice {
    return this._vehicleModelPrice;
  }

  select(){
    if (!this.isDisabled) {
      this.vehicleModelIdForm.setValue(this.vehicleModelPrice.vehicleModel.id);
    }
  }

  get isSelected(): boolean {
    return this.vehicleModelPrice.vehicleModel.id === this.vehicleModelIdForm.value;
  }

  get isDisabled(): boolean {
    return this.vehicleModelPrice.vehicleModel.passengerCapacity < this.passengerCount;
  }

  protected readonly faChevronDown = faChevronDown;
  protected readonly faUser = faUser;
  protected readonly faLuggageCart = faLuggageCart;
  protected readonly faSuitcase = faSuitcase;
}
