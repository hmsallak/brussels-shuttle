import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LayoutComponent } from '../../shared/components/layout/layout.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [LayoutComponent, RouterLink],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPageComponent {}
