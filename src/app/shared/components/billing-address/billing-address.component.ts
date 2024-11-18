import {Component, inject, output} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe} from "@angular/common";
import {TuiErrorModule} from "@taiga-ui/core";
import {TUI_VALIDATION_ERRORS, TuiFieldErrorPipeModule, TuiInputModule} from "@taiga-ui/kit";
import {BillingAddress} from "../../../core/models/billing-address";
import {VALIDATION_ERRORS} from "../../utils/error.utils";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  providers: [
    { provide: TUI_VALIDATION_ERRORS, useValue: VALIDATION_ERRORS},
  ],
  styleUrl: './billing-address.component.css'
})
export class BillingAddressComponent {
  private _formBuilder= inject(FormBuilder);

  private _billingAddressFormGroup = this._formBuilder.group({
    street: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s',.-]+$/)]),
    postalCode: new FormControl(null, [Validators.required, Validators.minLength(2),Validators.pattern(/^\d{4,5,6}$/)]),
    locality: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]+$/)]),
    country: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]+$/)]),
    identifier: new FormControl(null),
    registeredName: new FormControl(null),
  });

  billingAddressEvent = output<BillingAddress | null>()

  get streetForm(): FormControl<string | undefined>{
    return this._billingAddressFormGroup.get('street') as FormControl;
  }

  get postalCodeForm(): FormControl<string | undefined>{
    return this._billingAddressFormGroup.get('postalCode') as FormControl;
  }

  get localityForm(): FormControl<string | undefined>{
    return this._billingAddressFormGroup.get('locality') as FormControl;
  }

  get countryForm(): FormControl<string | undefined>{
    return this._billingAddressFormGroup.get('country') as FormControl;
  }

  get identifierForm(): FormControl<string | undefined>{
    return this._billingAddressFormGroup.get('identifier') as FormControl;
  }

  get registeredNameForm(): FormControl<string | undefined>{
    return this._billingAddressFormGroup.get('registeredName') as FormControl;
  }

  constructor() {
    this._billingAddressFormGroup.valueChanges.subscribe(value => {
      if(this._billingAddressFormGroup.invalid) {
        this.billingAddressEvent.emit(null);
      }
      else {
        const billingAddress: BillingAddress = {
          street: this.streetForm.value!,
          postalCode: this.postalCodeForm.value!,
          locality: this.localityForm.value!,
          country: this.countryForm.value!,
          identifier: this.identifierForm.value,
          registeredName: this.registeredNameForm.value,
        }
        this.billingAddressEvent.emit(billingAddress);
      }
    });
  }

}
