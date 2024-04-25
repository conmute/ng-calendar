import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDatepicker,
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-home-current-date',
  standalone: true,

  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home-current-date.component.html',
  styleUrl: './home-current-date.component.css',
})
export class HomeCurrentDateComponent {
  @Input() selectedDate?: Date;
  @Output() handleSelect = new EventEmitter<Date>();

  handleMatSelect(
    $event: MatDatepickerInputEvent<Date>,
    _datepicker: MatDatepicker<Date>,
  ) {
    if (!$event.value) return;
    this.handleSelect?.emit($event.value);
  }
}
