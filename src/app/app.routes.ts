import { Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {CreateBookingPageComponent} from "./pages/create-booking-page/create-booking-page.component";
import {SuccessPageComponent} from "./pages/success-page/success-page.component";
import {CancelPageComponent} from "./pages/cancel-page/cancel-page.component";
import {ContactPageComponent} from "./pages/contact-page/contact-page.component";
import {TermOfUsePageComponent} from "./pages/term-of-use-page/term-of-use-page.component";
import {FaqPageComponent} from "./pages/faq-page/faq-page.component";
import {DestinationPageComponent} from "./pages/services/destination-page/destination-page.component";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {PrivacyPolicyPageComponent} from "./pages/privacy-policy-page/privacy-policy-page.component";
import {AboutPageComponent} from "./pages/about-page/about-page.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Brussels Shuttle — Transfert aéroport privé à Bruxelles'
  },
  {
    path: 'booking/request',
    component: CreateBookingPageComponent,
    title: 'Réserver un transfert — Brussels Shuttle'
  },
  {
    path: 'success',
    component: SuccessPageComponent,
    title: 'Réservation confirmée — Brussels Shuttle'
  },
  {
    path: 'cancel',
    component: CancelPageComponent,
    title: 'Paiement annulé — Brussels Shuttle'
  },
  {
    path: 'contact',
    component: ContactPageComponent,
    title: 'Contact — Brussels Shuttle'
  },
  {
    path: 'services/destinations',
    component: DestinationPageComponent,
    title: 'Nos destinations — Brussels Shuttle'
  },
  {
    path: 'term-of-use',
    component: TermOfUsePageComponent,
    title: 'Conditions générales — Brussels Shuttle'
  },
  {
    path: 'faq',
    component: FaqPageComponent,
    title: 'FAQ — Brussels Shuttle'
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyPageComponent,
    title: 'Politique de confidentialité — Brussels Shuttle'
  },
  {
    path: 'about',
    component: AboutPageComponent,
    title: 'À propos — Brussels Shuttle'
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    title: 'Page introuvable — Brussels Shuttle'
  }
];
