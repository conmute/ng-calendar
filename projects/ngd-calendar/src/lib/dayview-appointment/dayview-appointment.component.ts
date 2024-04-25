import { Component, Inject, Optional } from '@angular/core';
import { DayviewSchedulerComponent } from '../dayview-scheduler/dayview-scheduler.component';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'lib-dayview-appointment',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './dayview-appointment.component.html',
  styleUrl: './dayview-appointment.component.css',
})
export class DayviewAppointmentComponent {
  constructor(@Optional() parent: DayviewSchedulerComponent) {
    if (!parent) {
      throw new Error('ChildComponent must be rendered within ParentComponent');
    }
  }
}
