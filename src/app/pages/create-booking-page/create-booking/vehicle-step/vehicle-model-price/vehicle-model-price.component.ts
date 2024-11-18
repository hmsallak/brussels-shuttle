import {Component, computed, inject, input, Input, model} from '@angular/core';
import {VehicleModelPrice} from "../../../../../core/models/quote";
import {faChevronDown, faLuggageCart, faSuitcase, faUser} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormControl} from "@angular/forms";
import {LowerCasePipe, NgClass} from "@angular/common";
import {VehicleModel} from "../../../../../core/models/vehicle-model";
import {TranslateModule} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {scrollToSection} from "../../../../../shared/utils/element.utils";

@Component({
  selector: 'app-vehicle-model-price',
  standalone: true,
  imports: [
    FaIconComponent,
    NgClass,
    TranslateModule,
    LowerCasePipe
  ],
  templateUrl: './vehicle-model-price.component.html',
  styleUrl: './vehicle-model-price.component.css'
})
export class VehicleModelPriceComponent {
  vehicleModelPrice = input.required<VehicleModelPrice>();
  selectedVehicleModel = model<VehicleModel | null>()

  @Input() passengerCount: number = 1;

  select(){
    if (!this.isDisabled) {
      this.selectedVehicleModel.set(this.vehicleModelPrice().vehicleModel);
    }
  }

   isSelected= computed(() =>
     this.vehicleModelPrice().vehicleModel.id === this.selectedVehicleModel()?.id
   );

  get isDisabled(){
    return this.vehicleModelPrice().vehicleModel.passengerCapacity < this.passengerCount;
  }

  protected readonly faUser = faUser;
  protected readonly faSuitcase = faSuitcase;
  protected readonly scrollToSection = scrollToSection;
}
