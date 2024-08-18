import {Component, EventEmitter, input, Output} from '@angular/core';
import {JourneyQuote} from "../../../../core/models/journey-quote";
import {VehicleModelPriceComponent} from "./vehicle-model-price/vehicle-model-price.component";
import {FormControl, Validators} from "@angular/forms";
import {VehicleModel} from "../../../../core/models/vehicle-model";

@Component({
  selector: 'app-journey-quote',
  standalone: true,
  imports: [
    VehicleModelPriceComponent
  ],
  templateUrl: './journey-quote.component.html',
  styleUrl: './journey-quote.component.css'
})
export class JourneyQuoteComponent {
  passengerCount = input<number>(1);
  journeyQuote = input.required<JourneyQuote>();
  vehicleModelIdForm: FormControl =new FormControl(null, [Validators.required]);
  @Output() selectVehicleModelEvent: EventEmitter<VehicleModel> = new EventEmitter<VehicleModel>();
}
