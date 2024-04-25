import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppointmentsService } from './appointments.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-calendar';

  constructor(appointmentsService: AppointmentsService) {
    appointmentsService.loadData().then(console.log);
  }
}
