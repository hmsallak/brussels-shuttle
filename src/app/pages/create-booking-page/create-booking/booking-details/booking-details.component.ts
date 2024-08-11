import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  TuiDataListWrapperModule,
  TuiInputDateModule,
  TuiInputDateTimeModule,
  TuiInputTimeModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import {TuiButtonModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {GoogleMap} from "@angular/google-maps";
import {
  PlaceAutocompleteComponent
} from "../../../../shared/components/place-auto-complete/place-auto-complete.component";
import {dateMinTomorrowValidator, timeValidator} from "../../../../shared/services/custom-validator";
import {BookingDetails} from "../../../../core/models/booking-details";
import {JsonPipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {TuiDay, TuiTime} from "@taiga-ui/cdk";

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [
    TuiInputDateTimeModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    GoogleMap,
    PlaceAutocompleteComponent,
    TuiInputTimeModule,
    TuiInputDateModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiButtonModule,
    JsonPipe
  ],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent {
  private _formBuilder= inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  @Output() bookingDetails = new EventEmitter<BookingDetails>();

  startAddressParam = this.activatedRoute.snapshot.queryParams['startAddress'];
  endAddressParam = this.activatedRoute.snapshot.queryParams['endAddress'];
  dataTimeParam = this.activatedRoute.snapshot.queryParams['dateTime'];

  private _bookingDetailsFormGroup = this._formBuilder.group({
    startTime: new FormGroup({
      date: new FormControl(this.getDateFormBasedParam(), [Validators.required, dateMinTomorrowValidator()]),
      time: new FormControl(this.getTimeFormBasedParam(), [Validators.required, timeValidator()]),
    }),
    startAddress: new FormGroup({
      address: new FormControl(this.startAddressParam, [Validators.required, Validators.minLength(3)]),
      place: new FormControl(null, [Validators.required]),
    }),
    endAddress: new FormGroup({
      address: new FormControl(this.endAddressParam, [Validators.required, Validators.minLength(3)]),
      place: new FormControl(null, [Validators.required]),
    }),
    passengerCount: new FormControl(1,  [Validators.required, Validators.min(1), Validators.max(9)])
  });

  constructor() {
    this._bookingDetailsFormGroup.statusChanges.subscribe(status => {
      if (this._bookingDetailsFormGroup.valid){
        this.sendBookingDetails();
      } else {
        this.bookingDetails.emit();
      }
    });
  }

  private _passengerCountItems: number[] = Array.from({length: 9}, (_, i) => i + 1);

  get passengerCountItems(): number[] {
    return this._passengerCountItems;
  }

  get startTimeDateForm(): FormControl {
    return this._bookingDetailsFormGroup.get('startTime.date') as FormControl;
  }

  get startTimeTimeForm(): FormControl {
    return this._bookingDetailsFormGroup.get('startTime.time') as FormControl;
  }

  get startAddressForm(): FormGroup {
    return this._bookingDetailsFormGroup.get('startAddress') as FormGroup;
  }

  get endAddressForm(): FormGroup {
    return this._bookingDetailsFormGroup.get('endAddress') as FormGroup;
  }

  get passengerCountForm(): FormControl {
    return this._bookingDetailsFormGroup.get('passengerCount') as FormControl;
  }

  get bookingDetailsFormGroup() {
    return this._bookingDetailsFormGroup;
  }

  clean(){
    this.startTimeDateForm.reset();
    this.startTimeTimeForm.reset();
    this.startAddressForm.reset();
    this.endAddressForm.reset();
    this.passengerCountForm.reset(1);
    this.bookingDetails.emit();
  }

  private getDateFormBasedParam(){
    if(this.dataTimeParam){
      const date = new Date(this.dataTimeParam);
      return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate());
    }
    return null;
  }

  getTimeFormBasedParam(){
    if(this.dataTimeParam){
      const date = new Date(this.dataTimeParam);
      return new TuiTime(date.getHours(), date.getMinutes());
    }
    return null;
  }

  private getDateTime(): Date {
    const year = this.startTimeDateForm.value['year'];
    const month = this.startTimeDateForm.value['month'];
    const day = this.startTimeDateForm.value['day'];
    const hours = this.startTimeTimeForm.value['hours'];
    const minutes = this.startTimeTimeForm.value['minutes'];
    return new Date(year, month, day, hours, minutes);
  }

  sendBookingDetails() {
    const bookingDetails: BookingDetails = {
      startTime: this.getDateTime(),
      startAddress: {
        address: this.startAddressForm.get('address')?.value,
        place: this.startAddressForm.get('place')?.value
      },
      endAddress: {
        address: this.endAddressForm.get('address')?.value,
        place: this.endAddressForm.get('place')?.value
      },
      passengerCount: this.passengerCountForm.value
    };

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { startAddress: bookingDetails.startAddress.place.name, endAddress: bookingDetails.endAddress.place.name, dateTime: bookingDetails.startTime.toISOString()},
        queryParamsHandling: 'merge'
      }
    );

    this.bookingDetails.emit(bookingDetails);
  }
}
