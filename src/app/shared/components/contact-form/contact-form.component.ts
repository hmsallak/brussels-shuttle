import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiInputModule, TuiPushModule, TuiPushService, TuiTextareaModule} from "@taiga-ui/kit";
import {TuiAlertService, TuiButtonModule, TuiLabelModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {EmailGateway} from "../../../core/ports/email.gateway";
import {QuestionMail} from "../../../core/models/question-mail";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";



@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    TuiInputModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TuiTextareaModule,
    TuiLabelModule,
    TuiButtonModule,
    TuiPushModule

  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class ContactFormComponent {
  private _formBuilder= inject(FormBuilder);
  private emailGateway = inject(EmailGateway);
  private tuiAlertService = inject(TuiAlertService);
  private tuiPushService = inject(TuiPushService);


  private _contactFormGroup = this._formBuilder.group({
    name: new FormControl('a', [Validators.required]),
    email: new FormControl('yassabk@hotmail.com', [Validators.required, Validators.email]),
    message: new FormControl('a', [Validators.required]),
    acceptedTerms: new FormControl(false, [Validators.requiredTrue])
  });

  success = false;

  showSuccess() {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 400);
  }

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
      this._contactFormGroup.markAllAsTouched();
      return;
    }

    const mail : QuestionMail = {
      html: true,
      message: this.messageFormControl.value,
      subject: "Question de " + this.nameFormControl.value,
      userContact: this.emailFormControl.value,
      userName: this.nameFormControl.value
    }
    this.emailGateway.sendQuestionEmail(mail).subscribe( value => {
      this._contactFormGroup.reset();
      this.showSuccess();
    });
  }
}
