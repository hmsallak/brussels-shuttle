import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {PlaceAddress} from "../../../core/models/PlaceAddress";
import {TuiInputModule} from "@taiga-ui/kit";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";
import {GooglePlacesDirective} from "../../directives/google-places.directive";



@Component({
  selector: 'app-place-auto-complete',
  standalone: true,
  imports: [
    TuiInputModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    GooglePlacesDirective

  ],
  templateUrl: './place-auto-complete.component.html',
  styleUrl: './place-auto-complete.component.css'
})
export class PlaceAutocompleteComponent implements OnInit {

  @Input() addressForm: FormGroup = new FormGroup({});
  @Input() label = 'Destination';
  @Input() icon = 'tuiIconMapPinLarge';

  @Output() placeChanged = new EventEmitter<PlaceAddress>();

  constructor() {}

  ngOnInit() {
    this.inputAddress.valueChanges.subscribe((value: string) => {
      if (!value) {
        this.placeAddress.setValue(undefined);
      }
    });
  }

  get placeAddress(): FormControl {
    return this.addressForm.get('place') as FormControl;
  }

  get inputAddress(): FormControl {
    return this.addressForm.get('address') as FormControl;
  }

  onPlaceChanged($event: PlaceAddress) {
    this.placeAddress.setValue($event);
    this.placeChanged.emit($event);
  }

}
