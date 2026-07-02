import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LayoutComponent } from '../../shared/components/layout/layout.component';

type BlogPost = {
  title: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
};

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
    excerpt: 'Horaires, bagages, vol retarde, prise en charge a domicile ou hotel: les points a verifier avant de reserver votre chauffeur prive.',
    image: 'assets/images/zaventem.webp'
  };

  posts: BlogPost[] = [
    {
      title: 'Aller a Tomorrowland depuis Bruxelles ou Zaventem',
      category: 'Festival',
      excerpt: 'Conseils pour reserver un transfert vers Boom, organiser le retour tardif et voyager en groupe avec bagages.',
      image: 'assets/images/brussels-shuttle-bg-phone.webp',
      readTime: '4 min'
    },
    {
      title: 'Brugge, Gand, Liege, Namur: visiter la Belgique avec chauffeur',
      category: 'Villes belges',
      excerpt: 'Idees de trajets prives pour decouvrir les villes belges sans dependance aux horaires de train.',
      image: 'assets/images/schuman.webp',
      readTime: '5 min'
    },
    {
      title: 'Zaventem ou Charleroi: quel aeroport choisir depuis Bruxelles ?',
      category: 'Aeroports',
      excerpt: 'Distance, temps de route, horaires de vol et confort: les criteres utiles avant de reserver votre transfert.',
      image: 'assets/images/charleroi.webp',
      readTime: '3 min'
    },
    {
      title: 'Transfert vers Paris CDG, Orly, Schiphol ou Eindhoven',
      category: 'Europe',
      excerpt: 'Quand un trajet prive vers un aeroport europeen devient plus simple qu une correspondance compliquee.',
      image: 'assets/images/cdg.webp',
      readTime: '4 min'
    },
    {
      title: 'Les Ardentes a Liege: organiser son transport de festival',
      category: 'Festival',
      excerpt: 'Arrivee, retour, groupe, securite et confort: ce qu il faut anticiper pour profiter du festival.',
      image: 'assets/images/lille.webp',
      readTime: '4 min'
    },
    {
      title: 'Voyager tot le matin: pourquoi reserver un chauffeur la veille',
      category: 'Conseils',
      excerpt: 'Vol matinal, reveil difficile, bagages, enfants: les avantages d un transfert aeroport planifie.',
      image: 'assets/images/orly.webp',
      readTime: '3 min'
    }
  ];
}
