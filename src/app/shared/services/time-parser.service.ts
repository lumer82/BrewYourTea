import { Injectable } from '@angular/core';

@Injectable()
export class TimeParserService {

  constructor() { }

  parseTime(time: string): number {
    const regex = /^(?:(\d+)\s*(?:$|[mM]\w*|:)\s?([0-5]?\d)?)|(\d+)(?:\s*[sS]\w*)/g;
    console.log('got time', time);
    if (!time) {
      return null;
    }
    const exec = regex.exec(time);
    console.log(`time ${time}`, exec);
    if (!exec) {
      return null;
    }
    const minutes = +exec[1] || 0;
    const seconds = +exec[2] || +exec[3] || 0;
    return (minutes * 60) + seconds;
  }

}
