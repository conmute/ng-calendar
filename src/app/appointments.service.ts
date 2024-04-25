import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { initialAppointmentsData } from './data';

export type Appointment = {
  id: string;
  title: string;
  startDate: Date;
  durationMinutes: number;
};

function isSameCalendarDay(input: Date, checkDate: Date) {
  return input.toDateString() === checkDate.toDateString();
}

function isDateInRange(input: Date, startDate: Date, endDate: Date) {
  return (
    input.toDateString() >= startDate.toDateString() &&
    input.toDateString() <= endDate.toDateString()
  );
}

/**
 * Service to handle appointments
 *
 * Even rxjs handles great with complex data pipes,
 * simple promises are great for fetching and handling errors!
 *
 * Keys for further hndling:
 *
 * * Use optimistic UI, change first and on error revert changes - keeping oldList is good here
 * * Error handling over promises, so we can send any error handler into .catch
 * * A possibility to add action to repeat again after failure, until success…
 */
@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private $appointments = new BehaviorSubject<Array<Appointment>>([]);
  appointments = this.$appointments.asObservable();

  constructor() {}

  loadData() {
    this.$appointments.next(initialAppointmentsData);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(initialAppointmentsData);
      });
    });
  }

  add(data: Appointment) {
    const oldList = this.$appointments.getValue();
    const newList = [...oldList, data];
    this.$appointments.next(newList);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newList);
      });
    });
  }

  remove(id: string) {
    const oldList = this.$appointments.getValue();
    const newList = oldList.filter((item) => item.id !== id);
    this.$appointments.next(newList);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newList);
      });
    });
  }

  update(id: string, data: Partial<Appointment>) {
    const oldList = this.$appointments.getValue();
    const newList = oldList.map((item) => {
      if (item.id === id) {
        return { ...item, ...data };
      }
      return item;
    });
    this.$appointments.next(newList);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newList);
      });
    });
  }

  byDay(checkDay: Date) {
    return this.appointments.pipe(
      map((list) => {
        return list.filter((item) => {
          return isSameCalendarDay(item.startDate, checkDay);
        });
      }),
    );
  }

  byDateRange(from: Date, to: Date) {
    return this.appointments.pipe(
      map((list) => {
        return list.filter((item) => {
          return isDateInRange(item.startDate, from, to);
        });
      }),
    );
  }
}
