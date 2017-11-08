import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

const descriptions = {
  minutes: {
    singular: 'minute',
    plural: 'minutes'
  },
  seconds: {
    singular: 'second',
    plural: 'seconds'
  }
};

@Component({
  selector: 'tea-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  private _time: number;
  minutes: { value: number, description: string};
  seconds: { value: number | string, description: string };

  @Input()
  set time(value: number) {
    if (value === this._time) {
      return;
    }
    this._time = value;

    this.minutes = this.getMinutes(value);

    this.seconds = this.getSeconds(value);
  }

  private getMinutes(value: number): { value: number, description: string} {
    const calculated_minutes = Math.floor(value / 60);
    if (!this.minutes || this.minutes.value !== calculated_minutes) {
      return calculated_minutes > 0
      ? {
        value: calculated_minutes,
        description: calculated_minutes === 1 ? descriptions.minutes.singular : descriptions.minutes.plural
      }
      : null;
    }
    return this.minutes;
  }

  private getSeconds(value: number): { value: number | string, description: string } {
    const calculated_seconds = this.calcSeconds(value);
    if (!this.seconds || this.seconds.value !== calculated_seconds) {
      return {
        value: calculated_seconds,
        description: calculated_seconds === '01' ? descriptions.seconds.singular : descriptions.seconds.plural
      };
    }
    return this.seconds;
  }

  private calcSeconds(value: number): number | string {
    const seconds = value % 60;
    return seconds < 10 ? '0' + seconds : seconds;
  }

  constructor() { }

  ngOnInit() {
  }

}
