import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {faChevronRight, faUser} from "@fortawesome/free-solid-svg-icons";
import {TuiCountryIsoCode} from '@taiga-ui/i18n';
import {Passenger} from "../../../core/models/passenger";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {TuiButtonModule, TuiDialogModule} from "@taiga-ui/core";
import {TuiInputModule, TuiInputPhoneInternationalModule} from "@taiga-ui/kit";

@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [
    FaIconComponent,
    TuiDialogModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPhoneInternationalModule,
    TuiButtonModule
  ],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css'
})
export class PersonalInformationComponent {
  private _formBuilder= inject(FormBuilder);

  protected readonly faChevronRight = faChevronRight;
  protected readonly faUser = faUser;

  private _personalInformationFormGroup = this._formBuilder.group({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
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
        this.personalInformationFormGroup.markAllAsTouched();
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

  get personalInformationFormGroup(): FormGroup {
    return this._personalInformationFormGroup;
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
