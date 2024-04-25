import { Appointment } from './appointments.service';

export const initialAppointmentsData: Appointment[] = [
  {
    id: 'asd',
    durationMinutes: 30,
    startDate: (() => {
      const today = new Date();
      // Set the time to 2 PM
      today.setHours(14, 0, 0, 0);
      return today;
    })(),
    title: 'Event example',
  },
  {
    id: 'dsa',
    durationMinutes: 60,
    startDate: (() => {
      const today = new Date();
      // Set the time to 2 PM
      today.setHours(12, 0, 0, 0);
      return today;
    })(),
    title: 'Event example 2',
  },
  {
    id: 'msd',
    durationMinutes: 120,
    startDate: (() => {
      const today = new Date();
      // Set the time to 2 PM
      today.setHours(14, 0, 0, 0);
      return today;
    })(),
    title: 'Event example 3',
  },
  {
    id: 'msdf',
    durationMinutes: 60,
    startDate: (() => {
      const today = new Date();
      // Set the time to 2 PM
      today.setHours(18, 0, 0, 0);
      return today;
    })(),
    title: 'Event example 3',
  },
];
