import {ChangeDetectorRef, Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {TuiButtonModule, TuiDialogModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {faCashRegister, faChevronRight, faMoneyBill, faUser} from "@fortawesome/free-solid-svg-icons";
import {TuiInputModule, TuiInputPhoneInternationalModule} from "@taiga-ui/kit";
import {TuiCountryIsoCode} from '@taiga-ui/i18n';
import {Passenger} from "../../../core/models/passenger";

@Component({
  selector: 'app-personal-information-dialog',
  standalone: true,
  imports: [
    FaIconComponent,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiInputModule,
    TuiInputPhoneInternationalModule,
    TuiTextfieldControllerModule
  ],
  templateUrl: './personal-information-dialog.component.html',
  styleUrl: './personal-information-dialog.component.css'
})
export class PersonalInformationDialogComponent {
  private _formBuilder= inject(FormBuilder);

  protected readonly faChevronRight = faChevronRight;
  protected readonly faUser = faUser;

  private _personalInformationFormGroup = this._formBuilder.group({
    firstName: new FormControl('Yassin', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('Aberkan', [Validators.required, Validators.minLength(3)]),
    mail: new FormControl('yassabk@test.be', [Validators.required, Validators.email]),
    phone: new FormControl('99999999', [Validators.required, Validators.minLength(3)]),
  });

  readonly countries: readonly TuiCountryIsoCode[] = [
    TuiCountryIsoCode.BE,
    TuiCountryIsoCode.FR,
    TuiCountryIsoCode.NL,
    TuiCountryIsoCode.LU,
    TuiCountryIsoCode.ES,
    TuiCountryIsoCode.DE,
  ];
  open = false;
  countryIsoCode = TuiCountryIsoCode.BE;

  @Output()
  public personalInformation = new EventEmitter<Passenger>();

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

  openModal() {
    this.open = true;
  }

  save() {
    if(this._personalInformationFormGroup.invalid) {
      this.personalInformationFormGroup.markAllAsTouched();
      return;
    }
    const passenger: Passenger = {
      firstName: this.firstNameForm.value,
      lastName: this.lastNameForm.value,
      email: this.mailForm.value,
      phoneNumber: this.phoneForm.value,
    }
    this.personalInformation.emit(passenger);
    this.open = false;
  }
}
