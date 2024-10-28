import {Component, computed, input} from '@angular/core';
import {RouteMetrics} from "../../../core/models/route-metrics";
import {Trip} from "../../../core/models/trip";
import {faCircle, faClock, faRoute} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {KmPipe} from "../../pipe/km.pipe";
import {MinutesPipe} from "../../pipe/minutes.pipe";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-route-info',
  standalone: true,
  imports: [
    FaIconComponent,
    KmPipe,
    MinutesPipe,
    NgClass
  ],
  templateUrl: './route-info.component.html',
  styleUrl: './route-info.component.css'
})
export class RouteInfoComponent {
  trip = input.required<Trip>();
  enableStyle = input<boolean>(true);

  tripName = computed(() => this.trip().startAddress.locality + ' - ' + this.trip().endAddress.locality);
  protected readonly faRoute = faRoute;
  protected readonly faClock = faClock;
}
