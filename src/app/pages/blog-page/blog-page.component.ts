import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { BLOG_ARTICLES } from './blog.data';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [LayoutComponent, RouterLink],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPageComponent {
  featured = {
    title: 'Comment organiser un transfert aeroport depuis Bruxelles sans stress',
    excerpt: 'Horaires, bagages, vol retardé, prise en charge à domicile ou hôtel: les points à vérifier avant de réserver votre chauffeur privé.',
    image: 'assets/images/zaventem.webp'
  };

  posts = BLOG_ARTICLES;
}
