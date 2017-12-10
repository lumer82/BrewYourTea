import { Observable } from 'rxjs/Observable';
import { RecentService } from './../shared/services/recent.service';
import { Setup } from './../shared/models/setup.model';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'tea-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetupComponent implements OnInit {

  presets: Array<Setup> = [
    { name: 'Green tea', time: '2 minutes' },
    { name: 'Black tea', time: '3 minutes' },
    { name: 'Herbal tea', time: '5 minutes' },
    { name: 'Fruit tea', time: '8 minutes' }
  ];

  form: FormGroup;
  recent$: Observable<Array<Setup>>;

  constructor(private formBuilder: FormBuilder, private recentService: RecentService) { }

  ngOnInit() {
    this.recent$ = this.recentService.recent$;

    this.form = this.formBuilder.group({
      name: '',
      time: '5 minutes'
    });
  }

  useSetup(setup: Setup): void {
    this.form.patchValue({
      name: setup.name,
      time: setup.time
    });
  }

  saveRecents(): void {
    this.recentService.saveRecents();
  }

  loadRecents(): void {
    this.recentService.loadRecents();
  }
}
