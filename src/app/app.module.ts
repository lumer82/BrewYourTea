import { TimerModule } from './timer/timer.module';
import { MinutesAndSecondsPipe } from './shared/pipes/minutes-and-seconds.pipe';
import { SharedModule } from './shared/shared.module';
import { SetupModule } from './setup/setup.module';
import { TeaMaterialModule } from './tea-material/tea-material.module';
import { SetupComponent } from './setup/setup.component';
import { LicensesComponent } from './licenses/licenses.component';
import { NotificationService } from './notification.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LicensesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    SetupModule,
    TimerModule,
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
