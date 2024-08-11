import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInformationDialogComponent } from './personal-information-dialog.component';

describe('PersonalInformationDialogComponent', () => {
  let component: PersonalInformationDialogComponent;
  let fixture: ComponentFixture<PersonalInformationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalInformationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
