import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ContactFormComponent} from "../../shared/components/contact-form/contact-form.component";
import {LayoutComponent} from "../../shared/components/layout/layout.component";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {DOCUMENT} from "@angular/common";

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'Combien de bagages puis-je emporter ?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Le nombre de bagages dépend du type de véhicule réservé. Pour les véhicules standards, nous pouvons transporter jusqu\'à 4 bagages standard (valises) et 4 bagages à main. Si vous avez besoin de transporter plus de bagages, nous vous recommandons de réserver un véhicule de plus grande capacité ou de nous en informer à l\'avance.' }
    },
    {
      '@type': 'Question',
      'name': 'Mon voyage est annulé, comment procéder au remboursement ?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'En cas d\'annulation, contactez-nous dès que possible par email à info@brussels-shuttle.be ou par téléphone au +32 471 010 113. Les conditions de remboursement dépendent du délai d\'annulation précisé dans nos conditions générales.' }
    },
    {
      '@type': 'Question',
      'name': 'Quels sont vos moyens de paiement ?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Vous pouvez payer par carte bancaire en ligne lors de la réservation, ou en espèces directement auprès du chauffeur.' }
    },
    {
      '@type': 'Question',
      'name': 'Puis-je changer la date de mon transfert ?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Oui, vous pouvez modifier la date de votre transfert en nous contactant par email ou par téléphone. Des modifications sont possibles sous réserve de disponibilité et selon nos conditions générales.' }
    },
    {
      '@type': 'Question',
      'name': 'Puis-je réserver un transfert de dernière minute ?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Oui, vous pouvez réserver un transfert de dernière minute, sous réserve de disponibilité. Pour une demande urgente, contactez-nous directement par téléphone au +32 471 010 113.' }
    },
    {
      '@type': 'Question',
      'name': 'Proposez-vous des sièges pour enfants ?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Oui, nous proposons des sièges pour enfants pour leur sécurité et leur confort, sous réserve de disponibilité. Merci de le préciser lors de votre réservation.' }
    },
    {
      '@type': 'Question',
      'name': 'Que se passe-t-il si mon vol est retardé ?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Nous suivons les horaires des vols en temps réel. Si votre vol est retardé, votre chauffeur ajustera son arrivée sans frais supplémentaires. Assurez-vous de bien indiquer votre numéro de vol lors de la réservation.' }
    }
  ]
};

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  standalone: true,
  imports: [
    ContactFormComponent,
    LayoutComponent,
    RouterLink,
    TranslateModule
  ],
  styleUrl: './faq-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqPageComponent implements OnInit, OnDestroy {
  private document = inject(DOCUMENT);
  private scriptEl?: HTMLScriptElement;

  ngOnInit() {
    this.scriptEl = this.document.createElement('script');
    this.scriptEl.type = 'application/ld+json';
    this.scriptEl.id = 'faq-schema';
    this.scriptEl.text = JSON.stringify(FAQ_SCHEMA);
    this.document.head.appendChild(this.scriptEl);
  }

  ngOnDestroy() {
    this.scriptEl?.remove();
  }
}
