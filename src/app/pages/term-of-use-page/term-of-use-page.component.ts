import { Component } from '@angular/core';
import {LayoutComponent} from "../../shared/components/layout/layout.component";

@Component({
  selector: 'app-term-of-use-page',
  standalone: true,
  imports: [
    LayoutComponent,
  ],
  templateUrl: './term-of-use-page.component.html',
  styleUrl: './term-of-use-page.component.css'
})
export class TermOfUsePageComponent {
  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
