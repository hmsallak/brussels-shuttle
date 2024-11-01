import {Component, computed, input, Input} from '@angular/core';
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
  vehicleModelPrice = input.required<VehicleModelPrice>();

  @Input() passengerCount: number = 1;

  @Input()
  vehicleModelIdForm: FormControl = new FormControl();

  select(){
    if (!this.isDisabled) {
      this.vehicleModelIdForm.setValue(this.vehicleModelPrice().vehicleModel.id);
    }
  }

  get isSelected(){
    return this.vehicleModelPrice().vehicleModel.id === this.vehicleModelIdForm.value;
  }

  get isDisabled(){
    return this.vehicleModelPrice().vehicleModel.passengerCapacity < this.passengerCount;
  }

  protected readonly faUser = faUser;
  protected readonly faSuitcase = faSuitcase;
}
