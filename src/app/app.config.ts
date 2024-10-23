import {provideAnimations} from "@angular/platform-browser/animations";
import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {BookingGateway} from "./core/ports/booking.gateway";
import {JourneyQuoteGateway} from "./core/ports/journey-quote.gateway";
import {VehicleModelGateway} from "./core/ports/vehicle-model.gateway";
import {HttpVehicleModelGateway} from "./core/adapters/http-vehicle-model.gateway";
import {HttpJourneyQuoteGateway} from "./core/adapters/http-journey-quote.gateway";
import {HttpBookingGateway} from "./core/adapters/http-booking.gateway";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNgxStripe} from "ngx-stripe";
import {StripeGateway} from "./core/ports/stripe.gateway";
import {HttpStripeGateway} from "./core/adapters/http-stripe.gateway";
import {PaymentGateway} from "./core/ports/payment.gateway";
import {HttpPaymentGateway} from "./core/adapters/http-payment.gateway";
import {provideLottieOptions} from "ngx-lottie";
import player from 'lottie-web';
import {registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import {environment} from "../environments/environment";
import {TuiRootModule} from "@taiga-ui/core";

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeEn, 'en');

export const provideTranslation = () => ({
  defaultLanguage: 'fr',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
});

export function HttpLoaderFactory(http: HttpClient) {
  return  new  TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function getBrowserLanguage(): string {
  const language = window.navigator.language || 'fr';
  // Vous pouvez éventuellement mapper des codes de langue plus spécifiques ici
  return language.split('-')[0]; // Prend la partie principale du code langue (ex: 'en' pour 'en-US')
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideNgxStripe(environment.STRIPE_PUBLIC_KEY),
    importProvidersFrom([
        TuiRootModule,
        TranslateModule.forRoot(provideTranslation())
      ]
    ),
    provideLottieOptions({
      player: () => player,
    }),
    provideAnimationsAsync(),
    { provide: BookingGateway, useFactory: () => new HttpBookingGateway() },
    { provide: JourneyQuoteGateway, useFactory: () => new HttpJourneyQuoteGateway() },
    { provide: StripeGateway, useFactory: () => new HttpStripeGateway() },
    { provide: PaymentGateway, useFactory: () => new HttpPaymentGateway() },
    { provide: VehicleModelGateway, useFactory: () => new HttpVehicleModelGateway() },
    { provide: LOCALE_ID, useFactory: getBrowserLanguage },
  ]
};
