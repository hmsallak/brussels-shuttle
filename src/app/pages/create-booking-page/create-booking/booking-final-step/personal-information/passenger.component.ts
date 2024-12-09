import {Component, inject, output} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiCountryIsoCode} from '@taiga-ui/i18n';
import {Passenger} from "../../../../../core/models/passenger";
import {TuiButtonModule, TuiDialogModule, TuiErrorModule} from "@taiga-ui/core";
import {
  TUI_VALIDATION_ERRORS,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPhoneInternationalModule
} from "@taiga-ui/kit";
import {AsyncPipe} from "@angular/common";
import {VALIDATION_ERRORS} from "../../../../../shared/utils/error.utils";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-passenger',
  standalone: true,
  imports: [
    TuiDialogModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPhoneInternationalModule,
    TuiButtonModule,
    AsyncPipe,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TranslateModule
  ],
  templateUrl: './passenger.component.html',
  styleUrl: './passenger.component.css',
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: VALIDATION_ERRORS,
    },
  ],
})
export class PassengerComponent {
  private _formBuilder= inject(FormBuilder);

  private _personalInformationFormGroup = this._formBuilder.group({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$')]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$')]),
    mail: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
  });

  readonly countries: readonly TuiCountryIsoCode[] = [TuiCountryIsoCode.BE, TuiCountryIsoCode.FR, TuiCountryIsoCode.NL, TuiCountryIsoCode.LU, TuiCountryIsoCode.ES, TuiCountryIsoCode.DE];
  countryIsoCode : TuiCountryIsoCode  = TuiCountryIsoCode.BE;

  passengerEvent = output<Passenger | null>();

  constructor() {
    this._personalInformationFormGroup.valueChanges.subscribe(value => {
      if(this._personalInformationFormGroup.invalid) {
        this.passengerEvent.emit(null);
      } else{
        const passenger: Passenger = {
          firstName: this.firstNameForm.value,
          lastName: this.lastNameForm.value,
          email: this.mailForm.value,
          phoneNumber: this.phoneForm.value,
        }
        this.passengerEvent.emit(passenger);
      }
    });
  }

  get firstNameForm(): FormControl {
    return this._personalInformationFormGroup.get('firstName') as FormControl;
  }
  get lastNameForm(): FormControl {
    return this._personalInformationFormGroup.get('lastName') as FormControl;
  }
  get mailForm(): FormControl {
    return this._personalInformationFormGroup.get('mail') as FormControl;
  }
  get phoneForm(): FormControl {
    return this._personalInformationFormGroup.get('phone') as FormControl;
  }
}
