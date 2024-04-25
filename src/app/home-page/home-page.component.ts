import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import {
  DayviewSchedulerComponent,
  DayviewAppointmentComponent,
} from 'ngd-calendar';
import { Appointment, AppointmentsService } from '../appointments.service';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';

// Set start time to 8 AM for example, usual schedule time availibility
const STARTING_HOURS = 8;

const startDayTime = new Date();
startDayTime.setHours(STARTING_HOURS, 0, 0, 0);
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

  @ViewChild('greettemp', { read: ViewContainerRef })
  private greetviewcontainerref?: ViewContainerRef;

  loadingAsyncComponent = false;

  selectedDate = new BehaviorSubject(new Date());

  constructor(
    private appointmentsService: AppointmentsService,
    // private vcref: ViewContainerRef,
  ) {
    // this.appointmentsMeta$ = appointmentsService.byDay(new Date()).pipe(
    this.appointmentsMeta$ = appointmentsService
      .observeByDay(this.selectedDate)
      .pipe(
        map((list) => {
          return list
            .map((item) => {
              const startPosition =
                (item.startDate.getHours() - STARTING_HOURS) * 60 +
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
    this.loadAsyncComponent();
  }

  async loadAsyncComponent() {
    this.loadingAsyncComponent = false;
    const { HomeCurrentDateComponent } = await import(
      './home-current-date/home-current-date.component'
    );
    this.loadingAsyncComponent = false;
    if (!HomeCurrentDateComponent) {
      throw new Error('Failed to load component!');
    }
    this.greetviewcontainerref?.clear();
    const greetcomp = this.greetviewcontainerref?.createComponent(
      HomeCurrentDateComponent,
    );
    if (!greetcomp) {
      throw new Error('Failed to instantiace component…');
    }
    greetcomp.instance.handleSelect?.subscribe((selectedDate) => {
      this.selectedDate.next(selectedDate);
      console.log({ selectedDate });
    });
    greetcomp.instance.selectedDate = new Date();
    // this.vcref.clear();
    // const greetcomp = this.vcref.createComponent(HomeCurrentDateComponent);
    console.log(greetcomp?.instance);
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
