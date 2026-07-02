import {ChangeDetectionStrategy, Component, computed, effect, inject, input, model, output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

import {dateMinValidator, timeMinDifferenceValidator, timeValidator} from "../../services/custom-validator";
import {BookingDetails} from "../../../core/models/booking-details";
import {TuiDay, TuiTime} from "@taiga-ui/cdk";
import {
  TUI_VALIDATION_ERRORS,
  tuiCreateTimePeriods,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputTimeModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import {TuiDropdownModule, TuiErrorModule, TuiHintModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {PlaceAutocompleteComponent} from "../place-auto-complete/place-auto-complete.component";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {WayEnum} from "../../../core/models/enum/way.enum";
import {TranslateModule} from "@ngx-translate/core";
import {TripRequest} from "../../../core/models/api/request/trip-request";
import {TripEnum} from "../../../core/models/enum/trip.enum";
import {formatLocalDate, getDateTimeFromTui, parseLocalDate} from "../../utils/date.utils";
import {BannerComponent} from "../banner/banner.component";
import {BillingAddressComponent} from "../../../pages/create-booking-page/create-booking/booking-final-step/billing-address/billing-address.component";
import {VALIDATION_ERRORS} from "../../utils/error.utils";
import {Quote} from "../../../core/models/quote";
import {QuoteRequest} from "../../../core/models/api/request/quote-request";


@Component({
  selector: 'app-booking-from',
  standalone: true,
  imports: [
    PlaceAutocompleteComponent,
    TranslateModule,
    TuiSelectModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiDataListWrapperModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
    TuiInputTimeModule,
    TuiInputDateModule,
    TuiDropdownModule
  ],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: TUI_VALIDATION_ERRORS, useValue: VALIDATION_ERRORS },
  ],
})
export class BookingFormComponent {
  private _formBuilder= inject(FormBuilder);

  private form = this._formBuilder.group({
      startTime: new FormGroup({
        date: new FormControl(null, [Validators.required, dateMinValidator()]),
        time: new FormControl(null, [Validators.required, timeValidator()]),
      }, timeMinDifferenceValidator(6)),
      way: new FormControl(WayEnum.ONE_WAY, [Validators.required]),
      startAddress: new FormGroup({
        address: new FormControl(null, [Validators.required]),
        place: new FormControl(null, [Validators.required]),
      }),
      endAddress: new FormGroup({
        address: new FormControl(null, [Validators.required]),
        place: new FormControl(null, [Validators.required]),
      }),
      passengerCount: new FormControl(1,  [Validators.required, Validators.min(1), Validators.max(8)]),
      returnStartTime: new FormGroup({
        date: new FormControl(null),
        time: new FormControl(null),
      }, timeMinDifferenceValidator(6))
  });
  protected readonly passengerCountItems: number[] = Array.from({length: 8}, (_, i) => i + 1);
  protected readonly itemsPeriod = tuiCreateTimePeriods( 0, 24, [0, 15, 30, 45]);
  protected readonly wayItems = Object.values(WayEnum);
  protected readonly WayEnum = WayEnum;

  existingQuote = model<Quote>();
  departure = computed(() => this.existingQuote()?.trips.find(trip => trip.type === TripEnum.DEPARTURE));
  returnTrip = computed(() => this.existingQuote()?.trips.find(trip => trip.type === TripEnum.RETURN));
  quoteEffect = effect(() => {
    if(!this.existingQuote()) {
      return;
    }
    const startDateTime = this.departure() ? parseLocalDate(this.departure()!.startTime) : null;
    const startDate = startDateTime ? new TuiDay(startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate()) : null;
    const startTime = startDateTime ? new TuiTime(startDateTime.getHours(), startDateTime.getMinutes()) : null;

    const returnDateTime = this.returnTrip() ? parseLocalDate(this.returnTrip()!.startTime) : null;
    const returnDate = returnDateTime ? new TuiDay(returnDateTime.getFullYear(), returnDateTime.getMonth(), returnDateTime.getDate()) : null;
    const returnTime = returnDateTime ? new TuiTime(returnDateTime.getHours(), returnDateTime.getMinutes()) : null;

    const startAddress = this.existingQuote()?.trips[0]?.startAddress;
    const endAddress = this.existingQuote()?.trips[0]?.endAddress;

    const way = !!this.returnTrip() ? WayEnum.RETURN : WayEnum.ONE_WAY;

    this.startDateTimeForm.patchValue({date: startDate, time: startTime});
    this.returnStartDateTimeForm.patchValue({date: returnDate, time: returnTime});
    this.startAddressForm.patchValue({address: startAddress?.name, place: startAddress});
    this.endAddressForm.patchValue({address: endAddress?.name, place: endAddress});
    this.wayForm.patchValue(way);
    this.passengerCountForm.patchValue(this.existingQuote()?.passengerCount);
  });

  quoteRequest = output<QuoteRequest | null>();

  constructor() {
    this.bookingDetailsFormGroup.statusChanges.subscribe(status => {
      if (this.bookingDetailsFormGroup.valid && this.bookingDetailsFormGroup.dirty){
        this.sendBookingDetails();
      } else {
        this.quoteRequest.emit(null)
      }
    });
  }

  get startDateTimeForm(): FormGroup {
    return this.form.get('startTime') as FormGroup;
  }

  get startTimeDateForm(): FormControl {
    return this.form.get('startTime.date') as FormControl<TuiDay | null>;
  }

  get startTimeTimeForm(): FormControl {
    return this.form.get('startTime.time') as FormControl<TuiTime | null>;
  }

  get startAddressForm(): FormGroup {
    return this.form.get('startAddress') as FormGroup;
  }

  get endAddressForm(): FormGroup {
    return this.form.get('endAddress') as FormGroup;
  }

  get passengerCountForm(): FormControl {
    return this.form.get('passengerCount') as FormControl<number>;
  }

  get wayForm(): FormControl {
    return this.form.get('way') as FormControl<WayEnum>;
  }

  get returnStartDateTimeForm(): FormGroup {
    return this.form.get('returnStartTime') as FormGroup;
  }

  get returnStartTimeDateForm(): FormControl {
    return this.form.get('returnStartTime.date') as FormControl<TuiDay | null>;
  }

  get returnStartTimeTimeForm(): FormControl {
    return this.form.get('returnStartTime.time') as FormControl<TuiTime | null>;
  }

  get bookingDetailsFormGroup() {
    return this.form;
  }

  get isReturnWayValid(): boolean {
    return this.wayForm.value === WayEnum.RETURN && this.returnStartTimeDateForm.value && this.returnStartTimeTimeForm.value;
  }

  clear(){
    this.bookingDetailsFormGroup.reset({
      passengerCount: 1,
      way: WayEnum.ONE_WAY
    })
    this.quoteRequest.emit(null);
  }

  private getTripRequests(): Array<TripRequest> {
    const trips: Array<TripRequest> = [];
    trips.push({
      startAddress: this.startAddressForm.get('place')?.value,
      endAddress: this.endAddressForm.get('place')?.value,
      startTime: formatLocalDate(getDateTimeFromTui(this.startTimeDateForm.value, this.startTimeTimeForm.value)),
      type: TripEnum.DEPARTURE
    });
    if (this.isReturnWayValid) {
      trips.push({
        startAddress: this.endAddressForm.get('place')?.value,
        endAddress: this.startAddressForm.get('place')?.value,
        startTime: formatLocalDate(getDateTimeFromTui(this.returnStartTimeDateForm.value, this.returnStartTimeTimeForm.value)),
        type: TripEnum.RETURN
      });
    }
    return trips;
  }

  sendBookingDetails() {
    const quoteRequest: QuoteRequest = {
      trips: this.getTripRequests(),
      passengerCount: this.passengerCountForm.value
    };
    this.quoteRequest.emit(quoteRequest);
  }

  get minDate(): TuiDay {
    const date = new Date(Date.now());
    return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate());
  }

}
