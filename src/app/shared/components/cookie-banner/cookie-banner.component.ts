import { Component, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.css'
})
export class CookieBannerComponent implements OnInit {
  private readonly STORAGE_KEY = 'bs-cookie-consent';

  visible = signal(false);
  accepted = signal<boolean | null>(null);

  ngOnInit() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      setTimeout(() => this.visible.set(true), 1200);
    }
  }

  accept() {
    this.accepted.set(true);
    localStorage.setItem(this.STORAGE_KEY, 'accepted');
    this.dismiss();
  }

  refuse() {
    this.accepted.set(false);
    localStorage.setItem(this.STORAGE_KEY, 'refused');
    this.dismiss();
  }

  private dismiss() {
    setTimeout(() => this.visible.set(false), 350);
  }
}
