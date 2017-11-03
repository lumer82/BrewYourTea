import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ]
})
export class TeaMaterialModule { }
