import { RecentService } from './services/recent.service';
import { TimeParserService } from './services/time-parser.service';
import { RouterModule } from '@angular/router';
import { TeaMaterialModule } from './../tea-material/tea-material.module';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { MinutesAndSecondsPipe } from './pipes/minutes-and-seconds.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    TeaMaterialModule,
    RouterModule
  ],
  providers: [
    TimeParserService,
    RecentService
  ],
  declarations: [
    MinutesAndSecondsPipe,
    BackButtonComponent,
  ],
  exports: [
    MinutesAndSecondsPipe,
    BackButtonComponent
  ]
})
export class SharedModule { }
