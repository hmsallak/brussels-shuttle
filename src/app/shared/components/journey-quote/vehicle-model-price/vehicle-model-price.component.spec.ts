import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleModelPriceComponent } from './vehicle-model-price.component';

describe('VehicleModelPriceComponent', () => {
  let component: VehicleModelPriceComponent;
  let fixture: ComponentFixture<VehicleModelPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleModelPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleModelPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
