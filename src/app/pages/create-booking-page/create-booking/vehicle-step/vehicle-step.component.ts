import {Component, input, model} from '@angular/core';
import {Quote} from "../../../../core/models/quote";
import {VehicleModelPriceComponent} from "./vehicle-model-price/vehicle-model-price.component";
import {VehicleModel} from "../../../../core/models/vehicle-model";

@Component({
  selector: 'app-vehicle-step',
  standalone: true,
  imports: [
    VehicleModelPriceComponent
  ],
  templateUrl: './vehicle-step.component.html',
  styleUrl: './vehicle-step.component.css'
})
export class VehicleStepComponent {
  passengerCount = input<number>(1);
  quote = input.required<Quote>();
  vehicleModel = model<VehicleModel | null>()
}
