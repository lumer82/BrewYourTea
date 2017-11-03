import { SetupComponent } from './setup/setup.component';
import { LicensesComponent } from './licenses/licenses.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimerComponent } from './timer/timer.component';

const routes: Routes = [
  { path: 'setup', component: SetupComponent },
  { path: 'timer/:time', component: TimerComponent },
  { path: 'licenses', component: LicensesComponent },
  { path: '', redirectTo: 'setup', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
