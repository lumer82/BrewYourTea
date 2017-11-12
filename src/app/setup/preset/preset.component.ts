import { Setup } from './../../shared/models/setup.model';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tea-preset',
  templateUrl: './preset.component.html',
  styleUrls: ['./preset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresetComponent implements OnInit {

  @Input()
  setup: Setup;

  @Output()
  useSetup: EventEmitter<Setup> = new EventEmitter<Setup>();

  constructor() { }

  ngOnInit() {
  }
}
