import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentAddPageComponent } from './appointment-add-page.component';

describe('AppointmentAddPageComponent', () => {
  let component: AppointmentAddPageComponent;
  let fixture: ComponentFixture<AppointmentAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentAddPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
