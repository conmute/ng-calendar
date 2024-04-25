import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentPageComponent } from './appointment-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: AppointmentPageComponent,
  },
  {
    path: 'add',
    component: AppointmentPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentPageRoutingModule {}
