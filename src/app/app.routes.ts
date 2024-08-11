import { Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {CreateBookingPageComponent} from "./pages/create-booking-page/create-booking-page.component";
import {SuccessPageComponent} from "./pages/success-page/success-page.component";
import {CancelPageComponent} from "./pages/cancel-page/cancel-page.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'create-booking',
    component: CreateBookingPageComponent
  },
  {
    path: 'success',
    component: SuccessPageComponent
  },
  {
    path: 'cancel',
    component: CancelPageComponent
  }
];
