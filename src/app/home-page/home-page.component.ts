import { Component } from '@angular/core';
import {
  DayviewSchedulerComponent,
  DayviewAppointmentComponent,
} from 'ngd-calendar';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [DayviewSchedulerComponent, DayviewAppointmentComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
