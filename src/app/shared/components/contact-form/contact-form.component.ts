import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiInputModule, TuiTextareaModule} from "@taiga-ui/kit";
import {TuiButtonModule, TuiLabelModule, TuiTextfieldControllerModule} from "@taiga-ui/core";



@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    TuiInputModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TuiTextareaModule,
    TuiLabelModule,
    TuiButtonModule

  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  private _formBuilder= inject(FormBuilder);

  private _contactFormGroup = this._formBuilder.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
    acceptedTerms: new FormControl(false, [Validators.requiredTrue])
  });

  get nameFormControl() {
    return this._contactFormGroup.get('name') as FormControl;
  }

  get emailFormControl() {
    return this._contactFormGroup.get('email') as FormControl;
  }

  get messageFormControl() {
    return this._contactFormGroup.get('message') as FormControl;
  }

  get acceptedTermsFormControl() {
    return this._contactFormGroup.get('acceptedTerms') as FormControl;
  }

  get isFormValid() {
    return this._contactFormGroup.valid;
  }

  onSubmit() {
    if (this._contactFormGroup.invalid) {
      return;
    }

  }
}
