import { SetupModule } from './setup/setup.module';
import { TeaMaterialModule } from './tea-material/tea-material.module';
import { SetupComponent } from './setup/setup.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { LicensesComponent } from './licenses/licenses.component';
import { NotificationService } from './notification.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { AppRoutingModule } from './app.routing.module';
import { MinutesAndSecondsPipe } from './timer/minutes-and-seconds.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    LicensesComponent,
    BackButtonComponent,
    MinutesAndSecondsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SetupModule,
    TeaMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    NotificationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
