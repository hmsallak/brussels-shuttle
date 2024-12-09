import {
  AfterContentInit,
  Component, computed,
  ContentChildren,
  Input,
  QueryList
} from '@angular/core';
import {StepComponent} from "./step/step.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import {TuiButtonModule} from "@taiga-ui/core";
import {scrollToSection, scrollToTop} from "../../utils/element.utils";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    FaIconComponent,
    TuiButtonModule,
    TranslateModule
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent implements AfterContentInit  {
  @ContentChildren(StepComponent) steps!: QueryList<StepComponent>;

  @Input()
  customNavigation: boolean = false;

  ngAfterContentInit(): void {
    const stepsArray = this.steps.toArray();
    const firstIncompleteStepIndex = stepsArray.findIndex(step => !step.isStepComplete());
    this.setActiveStep(firstIncompleteStepIndex !== -1 ? firstIncompleteStepIndex : stepsArray.length - 1);
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

  scrollEffect = computed(() =>{
    this.steps.toArray().forEach(step => {
      if (step.isStepComplete()) {
        scrollToSection('nextStepButton');
      }
    })
  });


  public nextStep() {
    if (this.canNextStep) {
      scrollToTop();
      this.setActiveStep(this.activeStepIdx + 1);
    }
  }

  public prevStep() {
    if (this.activeStepIdx > 0) {
      scrollToTop();
      this.setActiveStep(this.activeStepIdx - 1);
    }
  }

  private setActiveStep(index: number) {
    this.steps.toArray().forEach((step, i) => {
      step.isActive.set(i === index);
    });
    this.activeStepIdx = index;
  }
  protected readonly faChevronLeft = faChevronLeft;
  protected readonly scrollToSection = scrollToSection;
  protected readonly scrollToTop = scrollToTop;
}
