import { MinutesAndSecondsPipe } from './pipes/minutes-and-seconds.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MinutesAndSecondsPipe
  ],
  exports: [
    MinutesAndSecondsPipe
  ]
})
export class SharedModule { }
