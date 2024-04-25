import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  DayviewSchedulerComponent,
  DayviewAppointmentComponent,
} from 'ngd-calendar';
import { Appointment, AppointmentsService } from '../appointments.service';
import { Observable, firstValueFrom, map } from 'rxjs';

const startDayTime = new Date();
startDayTime.setHours(8, 0, 0, 0); // Set start time to 8 AM, usual schedule time availibility

const reprcs = <T>(
  item: { data: { id: string }; start: number; duration: number } & T,
  i: number,
  list: Array<{ data: { id: string }; start: number; duration: number } & T>,
) => {
  let padleft = 0;
  let count = 1;
  list.forEach((aptmnt, j) => {
    if (item.data.id === aptmnt.data.id) return;
    const topEdgeOverlap =
      item.start >= aptmnt.start &&
      item.start <= aptmnt.start + aptmnt.duration;
    const bottomEdgeOverlap =
      item.start + item.duration >= aptmnt.start &&
      item.start + item.duration <= aptmnt.start + aptmnt.duration;
    if (topEdgeOverlap || bottomEdgeOverlap) {
      if (j <= i) padleft += 1;
      count += 1;
    }
  });
  return {
    ...item,
    padleft,
    count,
  };
};

type AppointmentMeta = {
  start: number;
  duration: number;
  count: number;
  padleft: number;
  data: Appointment;
};

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    DayviewSchedulerComponent,
    DayviewAppointmentComponent,
    CommonModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  appointmentsMeta$: Observable<AppointmentMeta[]>;

  constructor(private appointmentsService: AppointmentsService) {
    this.appointmentsMeta$ = appointmentsService.byDay(new Date()).pipe(
      map((list) => {
        return list
          .map((item) => {
            const startPosition =
              (item.startDate.getHours() - 8) * 60 +
              item.startDate.getMinutes();
            const durationHeight = item.durationMinutes;
            return {
              data: item,
              start: startPosition,
              duration: durationHeight,
              count: 1,
              padleft: 0,
            };
          })
          .sort((a, b) => a.start - b.start)
          .map(reprcs);
      }),
    );
  }

  async handleAppointmentStartChange(id: string, newPosition: number) {
    const appointmentsMeta = await firstValueFrom(this.appointmentsMeta$);
    const appointment = appointmentsMeta.find((item) => item.data.id === id);
    if (!appointment) {
      throw new Error('Modified appointment does not exists!');
    }
    const newTime = new Date(appointment.data.startDate);

    const minutesToAddOrSubtract =
      (newPosition > 0 ? newPosition : 0) - appointment.start;

    newTime.setMinutes(newTime.getMinutes() + minutesToAddOrSubtract);
    this.appointmentsService.update(id, { startDate: newTime });
  }

  handleAppointmentStartHint(id: string, deltaNumber: number) {
    console.log(id, { deltaNumber });
  }
}
