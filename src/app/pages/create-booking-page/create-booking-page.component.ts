import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {CreateBookingComponent} from "./create-booking/create-booking.component";
import {LayoutComponent} from "../../shared/components/layout/layout.component";
import {NgxSpinnerComponent} from "ngx-spinner";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {QuoteGateway} from "../../core/ports/quote.gateway";
import {toSignal} from "@angular/core/rxjs-interop";
import {catchError, EMPTY, tap} from "rxjs";
import {VehicleModel} from "../../core/models/vehicle-model";
import {StepperComponent} from "../../shared/components/stepper/stepper.component";
import {StepComponent} from "../../shared/components/stepper/step/step.component";

@Component({
  selector: 'app-create-booking-page',
  standalone: true,
  imports: [
    LayoutComponent,
    NgxSpinnerComponent,
    TranslateModule,
    CreateBookingComponent,
    StepperComponent,
    StepComponent,
  ],
  templateUrl: './create-booking-page.component.html',
  styleUrl: './create-booking-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateBookingPageComponent {
  private quoteGateway = inject(QuoteGateway);
  private route = inject(ActivatedRoute);

  vehicleModelParam = this.route.snapshot.queryParams['vehicleModel'];
  quoteParam = this.route.snapshot.queryParams['quote'];


  loading = signal(true)
  exisingQuote = toSignal(this.quoteGateway.getQuoteBySessionToKen()
    .pipe(
      tap(quote => {
        this.vehicleModel = quote.vehicleModelPrices.find(vehicleModelPrice => vehicleModelPrice.vehicleModel.id == this.vehicleModelParam)?.vehicleModel
        this.loading.set(false)
      }),
      catchError(() => {
        this.loading.set(false)
        return EMPTY;
      })
  ));

  vehicleModel ?: VehicleModel
}
