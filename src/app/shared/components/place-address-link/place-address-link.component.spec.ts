import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceAddressLinkComponent } from './place-address-link.component';

describe('PlaceAddressLinkComponent', () => {
  let component: PlaceAddressLinkComponent;
  let fixture: ComponentFixture<PlaceAddressLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceAddressLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceAddressLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
