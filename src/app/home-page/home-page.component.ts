import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  DayviewSchedulerComponent,
  DayviewAppointmentComponent,
} from 'ngd-calendar';

const appointments = [
  {
    id: 'asd',
    duration: 60,
    start: (() => {
      const today = new Date();
      // Set the time to 2 PM
      today.setHours(14, 0, 0, 0);
      return today;
    })(),
    title: 'Event example',
  },
  {
    id: 'dsa',
    duration: 60,
    start: (() => {
      const today = new Date();
      // Set the time to 2 PM
      today.setHours(12, 0, 0, 0);
      return today;
    })(),
    title: 'Event example 2',
  },
  {
    id: 'msd',
    duration: 60,
    start: (() => {
      const today = new Date();
      // Set the time to 2 PM
      today.setHours(14, 0, 0, 0);
      return today;
    })(),
    title: 'Event example 3',
  },
  {
    id: 'msdf',
    duration: 60,
    start: (() => {
      const today = new Date();
      // Set the time to 2 PM
      today.setHours(18, 0, 0, 0);
      return today;
    })(),
    title: 'Event example 3',
  },
];

const startDayTime = new Date();
startDayTime.setHours(8, 0, 0, 0); // Set start time to 8 AM, usual schedule time availibility

const reprcs = <T>(
  item: { id: string; start: number; duration: number } & T,
  i: number,
  list: Array<{ id: string; start: number; duration: number } & T>,
) => {
  let padleft = 0;
  let count = 1;
  list.forEach((aptmnt, j) => {
    if (item.id === aptmnt.id) return;
    if (
      (item.start >= aptmnt.start &&
        item.start < aptmnt.start + aptmnt.duration) ||
      (item.start + item.duration <= aptmnt.start + aptmnt.duration &&
        item.start + item.duration > aptmnt.start)
    ) {
      if (j > i) padleft += 1; //+ (aptmnt?.padleft || 0);
      count += 1;
    }
    // if (
    //   (item.start >= aptmnt.start &&
    //     item.start < aptmnt.start + aptmnt.duration) ||
    //   (item.start + item.duration <= aptmnt.start + aptmnt.duration &&
    //     item.start + item.duration > aptmnt.start)
    // ) {
    //   if (j > i) padleft += 1; //+ (aptmnt?.padleft || 0);
    //   count += 1;
    // }
  });
  return {
    ...item,
    padleft,
    count,
  };
};

function process(appointmentsList: typeof appointments) {
  return appointmentsList
    .map((item) => {
      const timeDifferenceMs = item.start.getTime() - startDayTime.getTime();

      return {
        ...item,
        start: timeDifferenceMs / (1000 * 60),
        padleft: 0,
        count: 1,
      };
    })
    .map(reprcs);
}

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
  appointments = process(appointments);

  handleAppointmentStartChange(id: string, newPosition: number) {
    console.log(id, { newPosition });
    const needle = this.appointments.find((item) => item.id === id);
    if (!needle) return;
    needle.start = newPosition > 0 ? newPosition : 0;
    this.appointments = this.appointments.map(reprcs);
  }

  handleAppointmentStartHint(id: string, deltaNumber: number) {
    console.log(id, { deltaNumber });
  }
}
