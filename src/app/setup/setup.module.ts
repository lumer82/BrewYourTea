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
    RouterModule
  ],
  declarations: [
    SetupComponent,
    PresetComponent
  ]
})
export class SetupModule { }
