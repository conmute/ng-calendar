import { Routes } from '@angular/router';
// import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
// import { AppointmentPageComponent } from './appointment-page/appointment-page.component';

export const routes: Routes = [
  {
    path: '',
    // component: HomePageComponent
    loadChildren: () =>
      import('./home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'appointment',
    loadChildren: () =>
      import('./appointment-page/appointment-page.module').then(
        (m) => m.AppointmentPageModule,
      ),
  },
  // { path: 'appointment/add', component: AppointmentPageComponent },
  // { path: 'appointment/:id', component: AppointmentPageComponent },
  { path: 'about', component: AboutPageComponent },
];
