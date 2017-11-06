import { MinutesAndSecondsPipe } from './../shared/pipes/minutes-and-seconds.pipe';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TeaMaterialModule } from './../tea-material/tea-material.module';
import { SetupComponent } from './setup.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PresetComponent } from './preset/preset.component';

@NgModule({
  imports: [
    CommonModule,
    TeaMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    SetupComponent,
    PresetComponent
  ]
})
export class SetupModule { }
