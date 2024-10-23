import {Component, input, Input, signal, Signal} from '@angular/core';
import {
  fadeInUpOnEnterAnimation,
} from "angular-animations";

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
  isActive: boolean = false;

  @Input() label: string = '';
  isStepComplete = input(true);
}
