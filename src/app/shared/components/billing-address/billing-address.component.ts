import {Component, inject, output} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe} from "@angular/common";
import {TuiErrorModule} from "@taiga-ui/core";
import {TuiFieldErrorPipeModule, TuiInputModule} from "@taiga-ui/kit";
import {BillingAddress} from "../../../core/models/billing-address";

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    ReactiveFormsModule
  ],
  styleUrl: './billing-address.component.css'
})
export class BillingAddressComponent {
  private _formBuilder= inject(FormBuilder);

  private _billingAddressFormGroup = this._formBuilder.group({
    street: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    postalCode: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    locality: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    country: new FormControl(null, [Validators.required]),
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
