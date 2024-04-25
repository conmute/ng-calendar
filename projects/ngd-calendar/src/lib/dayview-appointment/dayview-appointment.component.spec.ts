import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayviewAppointmentComponent } from './dayview-appointment.component';

describe('DayviewAppointmentComponent', () => {
  let component: DayviewAppointmentComponent;
  let fixture: ComponentFixture<DayviewAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayviewAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayviewAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
