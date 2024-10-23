import {AfterContentInit, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {StepComponent} from "./step/step.component";
import {NgTemplateOutlet} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import {TuiButtonModule} from "@taiga-ui/core";

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    FaIconComponent,
    TuiButtonModule
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent implements AfterContentInit  {
  @ContentChildren(StepComponent) steps!: QueryList<StepComponent>;

  @Input()
  customNavigation: boolean = false;

  ngAfterContentInit(): void {
    this.setActiveStep(0);
  }

  activeStepIdx: number = 0;

  get currentStepLabel() {
    return this.steps.toArray()[this.activeStepIdx].label;
  }

  get isLastStep() {
    return this.activeStepIdx === this.steps.length - 1;
  }

  get canNextStep() {
    const currentStep = this.steps.toArray()[this.activeStepIdx];
    return currentStep.isStepComplete() && this.activeStepIdx < this.steps.length - 1;
  }

  public nextStep() {
    if (this.canNextStep) {
      this.setActiveStep(this.activeStepIdx + 1);
    }
  }

  public prevStep() {
    if (this.activeStepIdx > 0) {
      this.setActiveStep(this.activeStepIdx - 1);
    }
  }

  private setActiveStep(index: number) {
    this.steps.toArray().forEach((step, i) => {
      step.isActive = i === index;
    });
    this.activeStepIdx = index;
  }

  protected readonly faChevronLeft = faChevronLeft;
}
