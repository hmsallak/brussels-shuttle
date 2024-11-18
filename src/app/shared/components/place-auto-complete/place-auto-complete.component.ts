import {
  Component,
  EventEmitter, inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PlaceAddress} from "../../../core/models/place-address";
import {TUI_VALIDATION_ERRORS, TuiFieldErrorPipeModule, TuiInputModule} from "@taiga-ui/kit";
import {TuiErrorModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {GooglePlacesDirective} from "../../directives/google-places.directive";
import {LocationService} from "../../services/location.service";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {AsyncPipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";



@Component({
  selector: 'app-place-auto-complete',
  standalone: true,
  imports: [
    TuiInputModule,
    FormsModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    GooglePlacesDirective,
    FaIconComponent,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
    TranslateModule,
  ],
  templateUrl: './place-auto-complete.component.html',
  styleUrl: './place-auto-complete.component.css',
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Veuillez sélectionner une adresse',
      },
    },
  ],
})
export class PlaceAutocompleteComponent implements OnInit {
  private locationService = inject(LocationService);

  @Input() addressForm: FormGroup = new FormGroup({});
  @Input() label = 'Destination';
  @Input() icon = 'tuiIconMapPinLarge';

  @Output() placeChanged = new EventEmitter<PlaceAddress>();

  ngOnInit() {
    this.inputAddress.valueChanges.subscribe((value: string) => {
        if (value != this.placeAddress.value?.name) {
          this.placeAddress.setValue(null);
        }
      }
    )
  }

  get isPLaceSelected(): boolean {
    return this.placeAddress.value
  }

  get placeAddress(): FormControl {
    return this.addressForm.get('place') as FormControl;
  }

  get inputAddress(): FormControl {
    return this.addressForm.get('address') as FormControl;
  }

  getLocation() {
    this.locationService.getCurrentPlaceAddress().subscribe(place => {
      this.inputAddress.setValue(place?.name);
      this.placeAddress.setValue(place);
    });
  }

  onPlaceChanged($event: PlaceAddress) {
    this.placeAddress.setValue($event);
    this.placeChanged.emit($event);
  }

  onBlur(){
    setTimeout(() => {
      this.placeAddress.markAsTouched();
    }, 300);
  }
}
