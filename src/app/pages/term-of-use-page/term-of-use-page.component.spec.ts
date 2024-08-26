import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermOfUsePageComponent } from './term-of-use-page.component';

describe('TermOfUsePageComponent', () => {
  let component: TermOfUsePageComponent;
  let fixture: ComponentFixture<TermOfUsePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermOfUsePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermOfUsePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
