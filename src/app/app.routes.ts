import { Routes } from '@angular/router';
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { CreateBookingPageComponent } from "./pages/create-booking-page/create-booking-page.component";
import { SuccessPageComponent } from "./pages/success-page/success-page.component";
import { CancelPageComponent } from "./pages/cancel-page/cancel-page.component";
import { ContactPageComponent } from "./pages/contact-page/contact-page.component";
import { TermOfUsePageComponent } from "./pages/term-of-use-page/term-of-use-page.component";
import { FaqPageComponent } from "./pages/faq-page/faq-page.component";
import { DestinationPageComponent } from "./pages/services/destination-page/destination-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { PrivacyPolicyPageComponent } from "./pages/privacy-policy-page/privacy-policy-page.component";
import { AboutPageComponent } from "./pages/about-page/about-page.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Transfert aéroport privé à Bruxelles | Brussels Shuttle',
    data: {
      description: 'Réservez votre navette aéroport privée à Bruxelles vers Zaventem, Charleroi, Paris CDG, Orly, Schiphol et Lille. Prix fixe, chauffeur professionnel, service 24h/7j.',
      canonical: '/'
    }
  },
  {
    path: 'booking/request',
    component: CreateBookingPageComponent,
    title: 'Réserver un transfert aéroport | Brussels Shuttle',
    data: {
      description: 'Obtenez votre prix instantanément et réservez votre transfert aéroport privé depuis ou vers Bruxelles. Paiement sécurisé et confirmation rapide.',
      canonical: '/booking/request',
      robots: 'noindex,follow'
    }
  },
  {
    path: 'success',
    component: SuccessPageComponent,
    title: 'Réservation confirmée | Brussels Shuttle',
    data: {
      description: 'Votre réservation Brussels Shuttle est confirmée.',
      canonical: '/success',
      robots: 'noindex,nofollow'
    }
  },
  {
    path: 'cancel',
    component: CancelPageComponent,
    title: 'Paiement annulé | Brussels Shuttle',
    data: {
      description: 'Votre paiement Brussels Shuttle a été annulé.',
      canonical: '/cancel',
      robots: 'noindex,nofollow'
    }
  },
  {
    path: 'contact',
    component: ContactPageComponent,
    title: 'Contact navette aéroport Bruxelles | Brussels Shuttle',
    data: {
      description: 'Contactez Brussels Shuttle pour une réservation, une demande de devis ou une question sur nos transferts aéroport privés à Bruxelles.',
      canonical: '/contact'
    }
  },
  {
    path: 'services/destinations',
    component: DestinationPageComponent,
    title: 'Destinations aéroport depuis Bruxelles | Brussels Shuttle',
    data: {
      description: 'Découvrez nos destinations de transfert privé depuis Bruxelles: Zaventem, Charleroi, Lille, Paris CDG, Orly, Schiphol, Eindhoven et plus.',
      canonical: '/services/destinations'
    }
  },
  {
    path: 'term-of-use',
    component: TermOfUsePageComponent,
    title: 'Conditions générales | Brussels Shuttle',
    data: {
      description: 'Consultez les conditions générales de réservation et de service de Brussels Shuttle.',
      canonical: '/term-of-use',
      robots: 'noindex,follow'
    }
  },
  {
    path: 'faq',
    component: FaqPageComponent,
    title: 'FAQ transfert aéroport Bruxelles | Brussels Shuttle',
    data: {
      description: 'Réponses aux questions fréquentes sur les transferts aéroport Brussels Shuttle: prix, bagages, paiement, retards de vol et disponibilité 24h/7j.',
      canonical: '/faq'
    }
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyPageComponent,
    title: 'Politique de confidentialité | Brussels Shuttle',
    data: {
      description: 'Découvrez comment Brussels Shuttle traite vos données personnelles et protège votre confidentialité.',
      canonical: '/privacy-policy',
      robots: 'noindex,follow'
    }
  },
  {
    path: 'about',
    component: AboutPageComponent,
    title: 'À propos de Brussels Shuttle | Navette aéroport privée',
    data: {
      description: 'Découvrez Brussels Shuttle, service de transfert aéroport privé basé à Bruxelles, avec prix fixe, suivi des vols et chauffeurs professionnels.',
      canonical: '/about'
    }
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    title: 'Page introuvable | Brussels Shuttle',
    data: {
      description: 'La page demandée est introuvable.',
      robots: 'noindex,nofollow'
    }
  }
];
