import { Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {CreateBookingPageComponent} from "./pages/create-booking-page/create-booking-page.component";
import {SuccessPageComponent} from "./pages/success-page/success-page.component";
import {CancelPageComponent} from "./pages/cancel-page/cancel-page.component";
import {ContactPageComponent} from "./pages/contact-page/contact-page.component";
import {TermOfUsePageComponent} from "./pages/term-of-use-page/term-of-use-page.component";
import {FaqPageComponent} from "./pages/faq-page/faq-page.component";
import {DestinationPageComponent} from "./pages/services/destination-page/destination-page.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'booking/request',
    component: CreateBookingPageComponent,
  },
  {
    path: 'success',
    component: SuccessPageComponent
  },
  {
    path: 'cancel',
    component: CancelPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'services/destinations',
    component: DestinationPageComponent
  },
  {
    path: 'term-of-use',
    component: TermOfUsePageComponent
  },
  {
    path: 'faq',
    component: FaqPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
