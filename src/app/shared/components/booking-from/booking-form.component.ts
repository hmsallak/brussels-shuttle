import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, output, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

import {dateMinValidator, timeValidator} from "../../services/custom-validator";
import {BookingDetails} from "../../../core/models/booking-details";
import {TuiDay, TuiTime} from "@taiga-ui/cdk";
import {
  TUI_VALIDATION_ERRORS,
  tuiCreateTimePeriods,
  TuiDataListWrapperModule, TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputTimeModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import {
  TuiErrorModule,
  TuiHintModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {
  PlaceAutocompleteComponent
} from "../place-auto-complete/place-auto-complete.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {WayEnum} from "../../../core/models/enum/way.enum";
import {TranslateModule} from "@ngx-translate/core";
import {TripRequest} from "../../../core/models/api/request/trip-request";
import {TripEnum} from "../../../core/models/enum/trip.enum";
import {formatLocalDate, getDateTimeFromTui} from "../../utils/date.utils";
import {BannerComponent} from "../banner/banner.component";
import {BillingAddressComponent} from "../billing-address/billing-address.component";


@Component({
  selector: 'app-booking-from',
  standalone: true,
  imports: [
    TuiSelectModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    PlaceAutocompleteComponent,
    TuiDataListWrapperModule,
    TuiInputDateModule,
    TuiInputTimeModule,
    AsyncPipe,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TranslateModule,
    TuiHintModule,
    NgIf,
    BannerComponent,
    BillingAddressComponent,
    FormsModule
  ],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Champ requis',
        invalidMinDate: 'La date doit être supérieure à la date du jour',
      },
    },
  ],
})
export class BookingFormComponent {
  private _formBuilder= inject(FormBuilder);

  private _bookingDetailsFormGroup = this._formBuilder.group({
    startTime: new FormGroup({
      date: new FormControl(null, [Validators.required, dateMinValidator()]),
      time: new FormControl(null, [Validators.required, timeValidator()]),
    }),
    way: new FormControl(WayEnum.ONE_WAY, [Validators.required]),
    startAddress: new FormGroup({
      address: new FormControl(null, [Validators.required]),
      place: new FormControl(null, [Validators.required]),
    }),
    endAddress: new FormGroup({
      address: new FormControl(null, [Validators.required]),
      place: new FormControl(null, [Validators.required]),
    }),
    passengerCount: new FormControl(1,  [Validators.required, Validators.min(1), Validators.max(9)]),
    returnStartTime: new FormGroup({
      date: new FormControl(null),
      time: new FormControl(null),
    }),
  });

  bookingDetails = output<BookingDetails | null>();
  private _passengerCountItems: number[] = Array.from({length: 9}, (_, i) => i + 1);
  protected readonly itemsPeriod = tuiCreateTimePeriods( 0, 24, [0, 15, 30, 45]);
  protected readonly wayItems = Object.values(WayEnum);
  protected readonly WayEnum = WayEnum;

  constructor() {
    this._bookingDetailsFormGroup.statusChanges.subscribe(status => {
      if (this._bookingDetailsFormGroup.valid){
        this.sendBookingDetails();
      } else {
        this.bookingDetails.emit(null)
      }
    });
  }

  get passengerCountItems(): number[] {
    return this._passengerCountItems;
  }

  get startTimeDateForm(): FormControl {
    return this._bookingDetailsFormGroup.get('startTime.date') as FormControl<TuiDay | null>;
  }

  get startTimeTimeForm(): FormControl {
    return this._bookingDetailsFormGroup.get('startTime.time') as FormControl<TuiTime | null>;
  }

  get startAddressForm(): FormGroup {
    return this._bookingDetailsFormGroup.get('startAddress') as FormGroup;
  }

  get endAddressForm(): FormGroup {
    return this._bookingDetailsFormGroup.get('endAddress') as FormGroup;
  }

  get passengerCountForm(): FormControl {
    return this._bookingDetailsFormGroup.get('passengerCount') as FormControl<number>;
  }

  get wayForm(): FormControl {
    return this._bookingDetailsFormGroup.get('way') as FormControl<WayEnum>;
  }

  get returnStartTimeDateForm(): FormControl {
    return this._bookingDetailsFormGroup.get('returnStartTime.date') as FormControl<TuiDay | null>;
  }

  get returnStartTimeTimeForm(): FormControl {
    return this._bookingDetailsFormGroup.get('returnStartTime.time') as FormControl<TuiTime | null>;
  }

  get bookingDetailsFormGroup() {
    return this._bookingDetailsFormGroup;
  }

  get isReturnWayValid(): boolean {
    return this.wayForm.value === WayEnum.RETURN && this.returnStartTimeDateForm.value && this.returnStartTimeTimeForm.value;
  }

  clean(){
    this.startTimeDateForm.reset();
    this.startTimeTimeForm.reset();
    this.startAddressForm.reset();
    this.endAddressForm.reset();
    this.passengerCountForm.reset(1);
    this.bookingDetails.emit(null);
  }

  private getTripRequests(): Array<TripRequest> {
    const trips: Array<TripRequest> = [];
    trips.push({
      startAddress: this.startAddressForm.get('place')?.value,
      endAddress: this.endAddressForm.get('place')?.value,
      startTime: formatLocalDate(getDateTimeFromTui(this.startTimeDateForm.value, this.startTimeTimeForm.value)),
      type: TripEnum.Departure
    });
    if (this.isReturnWayValid) {
      trips.push({
        startAddress: this.endAddressForm.get('place')?.value,
        endAddress: this.startAddressForm.get('place')?.value,
        startTime: formatLocalDate(getDateTimeFromTui(this.returnStartTimeDateForm.value, this.returnStartTimeTimeForm.value)),
        type: TripEnum.Return
      });
    }
    return trips;
  }

  sendBookingDetails() {
    const bookingDetails: BookingDetails = {
      trips: this.getTripRequests(),
      passengerCount: this.passengerCountForm.value
    };
    this.bookingDetails.emit(bookingDetails);
  }

}
