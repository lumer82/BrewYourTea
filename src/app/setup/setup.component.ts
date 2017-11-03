import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'tea-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetupComponent implements OnInit {

  presets: Array<Preset> = [
    { name: 'Green tea', time: 120 },
    { name: 'Black tea', time: 180 },
    { name: 'Herbal tea', time: 300 },
    { name: 'Fruit tea', time: 480 }
  ];

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: '',
      time: 300
    });
  }

  usePreset(preset: any): void {

  }

}
