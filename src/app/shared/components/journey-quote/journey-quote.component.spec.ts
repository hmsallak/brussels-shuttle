import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JounreyQuoteComponent } from './journey-quote.component';

describe('JounreyQuoteComponent', () => {
  let component: JounreyQuoteComponent;
  let fixture: ComponentFixture<JounreyQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JounreyQuoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JounreyQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
