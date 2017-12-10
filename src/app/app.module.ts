import { TimerModule } from './timer/timer.module';
import { SharedModule } from './shared/shared.module';
import { SetupModule } from './setup/setup.module';
import { TeaMaterialModule } from './tea-material/tea-material.module';
import { LicensesComponent } from './licenses/licenses.component';
import { NotificationService } from './notification.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

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
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    NotificationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
