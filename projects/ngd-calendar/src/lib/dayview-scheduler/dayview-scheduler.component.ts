import { Component } from '@angular/core';

import { DayviewAppointmentComponent } from '../dayview-appointment/dayview-appointment.component';

@Component({
  selector: 'lib-dayview-scheduler',
  standalone: true,
  imports: [DayviewAppointmentComponent],
  templateUrl: './dayview-scheduler.component.html',
  styleUrl: './dayview-scheduler.component.css',
})
export class DayviewSchedulerComponent {}
