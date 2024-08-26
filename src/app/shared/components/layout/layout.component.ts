import {Component, input} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NavigationComponent} from "../navigation/navigation.component";
import {FooterComponent} from "../footer/footer.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent,
    FooterComponent,
    NgClass
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  absoluteHeader= input(false)

}
