import {Component, effect, input, Input, model, signal, Signal} from '@angular/core';
import {
  fadeInUpOnEnterAnimation,
} from "angular-animations";
import {scrollToSection} from "../../../utils/element.utils";

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [],
  templateUrl: './step.component.html',
  styleUrl: './step.component.css',
  animations: [
    fadeInUpOnEnterAnimation({duration: 500}),
  ],
})
export class StepComponent {
  isActive = model(false);

  @Input() label: string = '';
  isStepComplete = input(true);
}
