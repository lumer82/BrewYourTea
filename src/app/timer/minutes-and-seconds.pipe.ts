import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesAndSeconds'
})
export class MinutesAndSecondsPipe implements PipeTransform {

  transform(value: number): any {
    if (value === 0) {
      return 'Done';
    }
    const minutes = Math.floor(value / 60);
    const minuteString = minutes === 1 ? 'minute' : 'minutes';
    const seconds = value % 60;
    const secondString = seconds === 1 ? 'second' : 'seconds';
    // const secondsString = seconds < 10 ? '0' + seconds : seconds.toString();
    let result = minutes > 0 ? `${minutes} ${minuteString} ` : '';
    result += `${seconds} ${secondString}`;
    return result;
  }

}
