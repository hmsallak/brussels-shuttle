import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  TUI_VALIDATION_ERRORS,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiPushModule,
  TuiPushService,
  TuiTextareaModule
} from "@taiga-ui/kit";
import {
  TuiAlertService,
  TuiButtonModule,
  TuiErrorModule,
  TuiLabelModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {EmailGateway} from "../../../core/ports/email.gateway";
import {QuestionMail} from "../../../core/models/question-mail";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {VALIDATION_ERRORS} from "../../utils/error.utils";
import {AsyncPipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {NotificationService} from "../../services/notification.service";
import {RouterLink} from "@angular/router";



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
    TuiPushModule,
    AsyncPipe,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TranslateModule,
    RouterLink

  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: TUI_VALIDATION_ERRORS, useValue: VALIDATION_ERRORS }
  ],
    animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class ContactFormComponent {
  private _formBuilder= inject(FormBuilder);
  private emailGateway = inject(EmailGateway);
  private notificationService= inject(NotificationService);

  private _contactFormGroup = this._formBuilder.group({
    name: new FormControl('', [Validators.required , Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$')]),
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
      this.notificationService.showSuccess('Votre message a bien été envoyé');
    });
  }
}
