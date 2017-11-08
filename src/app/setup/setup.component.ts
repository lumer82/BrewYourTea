import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Preset } from './shared/model/preset.model';

@Component({
  selector: 'tea-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetupComponent implements OnInit {

  presets: Array<Preset> = [
    { name: 'Green tea', time: 2 },
    { name: 'Black tea', time: 3 },
    { name: 'Herbal tea', time: 5 },
    { name: 'Fruit tea', time: 8 }
  ];

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: '',
      time: 5
    });
  }

  usePreset(preset: any): void {

  }

}
