import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiCountryIsoCode} from '@taiga-ui/i18n';
import {Passenger} from "../../../core/models/passenger";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {TuiButtonModule, TuiDialogModule, TuiErrorModule} from "@taiga-ui/core";
import {
  TUI_VALIDATION_ERRORS,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPhoneInternationalModule
} from "@taiga-ui/kit";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [
    FaIconComponent,
    TuiDialogModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPhoneInternationalModule,
    TuiButtonModule,
    AsyncPipe,
    TuiErrorModule,
    TuiFieldErrorPipeModule
  ],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css',
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Champ requis',
        minLength: 'Champ invalide',
        email: 'Mail invalide',
      },
    },
  ],
})
export class PersonalInformationComponent {
  private _formBuilder= inject(FormBuilder);

  private _personalInformationFormGroup = this._formBuilder.group({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    mail: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.minLength(3)]),
  });

  readonly countries: readonly TuiCountryIsoCode[] = [TuiCountryIsoCode.BE, TuiCountryIsoCode.FR, TuiCountryIsoCode.NL, TuiCountryIsoCode.LU, TuiCountryIsoCode.ES, TuiCountryIsoCode.DE];
  countryIsoCode : TuiCountryIsoCode  = TuiCountryIsoCode.BE;

  @Output()
  public personalInformation = new EventEmitter<Passenger>();

  constructor() {
    this._personalInformationFormGroup.valueChanges.subscribe(value => {
      if(this._personalInformationFormGroup.invalid) {
        this.personalInformation.emit(undefined);
      } else{
        const passenger: Passenger = {
          firstName: this.firstNameForm.value,
          lastName: this.lastNameForm.value,
          email: this.mailForm.value,
          phoneNumber: this.phoneForm.value,
        }
        this.personalInformation.emit(passenger);
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
