import { Component, Input, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';

import { Appointment, AppointmentsService } from '../appointments.service';
import { CommonModule } from '@angular/common';

class DateTimeValidator {
  static lessThanToday(control: FormControl): ValidationErrors | null {
    const today: Date = new Date();

    if (new Date(control.value) > today) return { lessThanToday: true };

    return null;
  }
  static todayAndFuture(control: FormControl): ValidationErrors | null {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);

    if (new Date(control.value) < today) return { todayAndFuture: true };

    return null;
  }
  static correctTimeFormat(control: FormControl): ValidationErrors | null {
    const timePattern = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
    if (!timePattern.test(control.value)) {
      return { correctTimeFormat: true };
    }

    return null;
  }
}

@Component({
  selector: 'app-appointment-page',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './appointment-page.component.html',
  styleUrl: './appointment-page.component.css',
})
export class AppointmentPageComponent implements OnInit {
  itemId?: string;
  @Input() selectedDate?: Date;

  data?: Appointment;

  apppointmentForm = new FormGroup({
    startDate: new FormControl(new Date(), [
      Validators.required,
      DateTimeValidator.todayAndFuture,
    ]),
    startTime: new FormControl('10:00', [
      Validators.required,
      DateTimeValidator.correctTimeFormat,
    ]),
    title: new FormControl('Appointment name', [
      Validators.required,
      Validators.minLength(5),
    ]),
    duration: new FormControl(60, [
      Validators.required,
      Validators.min(15),
      Validators.max(120),
    ]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appointmentService: AppointmentsService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const maybeId = params['id'];
      this.data = await this.appointmentService.byId(maybeId);
      if (this.data) {
        this.itemId = maybeId;
        this.apppointmentForm.setValue({
          startDate: this.data.startDate,
          startTime: this.data.startDate.toTimeString().split(' ')[0],
          title: this.data.title,
          duration: this.data.durationMinutes,
        });
      }
    });
  }

  handleMatSelect($event: MatDatepickerInputEvent<Date>) {
    if (!$event.value) return;
    // this.handleSelect?.emit($event.value);
  }

  async handleDelete(id: string) {
    const appointment = await this.appointmentService.byId(id);
    if (!appointment) return;
    if (confirm(`Delete appointment: ${appointment.title}`)) {
      this.appointmentService.remove(id);
      this.router.navigate(['/']);
    }
  }

  handleSubmit() {
    if (this.apppointmentForm.invalid && !this.apppointmentForm.pristine) {
      return;
    }
    const formData = this.apppointmentForm.value;
    // .getRawValue();
    if (
      !formData.duration ||
      !formData.startDate ||
      !formData.startTime ||
      !formData.title
    ) {
      return;
    }
    const startDate = new Date(formData.startDate);
    startDate.setHours(
      parseInt(formData.startTime.split(':')[0]),
      parseInt(formData.startTime.split(':')[1]),
      parseInt(formData.startTime.split(':')[2]) || 0,
    );
    if (this.itemId) {
      this.appointmentService.update(this.itemId, {
        title: formData.title,
        startDate,
        durationMinutes: formData.duration,
      });
    }
    if (!this.itemId) {
      console.log({
        id: window.crypto.randomUUID(),
        title: formData.title,
        startDate,
        durationMinutes: formData.duration,
      });
      this.appointmentService.add({
        id: window.crypto.randomUUID(),
        title: formData.title,
        startDate,
        durationMinutes: formData.duration,
      });
    }
    this.router.navigate(['/']);
  }
}
