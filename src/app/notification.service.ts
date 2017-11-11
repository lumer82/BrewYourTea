import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  private _granted = false;

  constructor() {
    this.requestPermission();
  }

  private requestPermission(): void {
    if ('Notification' in window && (<any>Notification).permission === 'default') {
      Notification.requestPermission().then(result => this._granted = result === 'granted');
    }
  }

  notify(title: string, body: string): void {
    /* tslint:disable-next-line:no-unused-expression */
    new Notification(title, <any>{
      body: body,
      icon: 'assets/images/favicon/android-chrome-192x192.png',
      requireInteraction: true
    });
  }

}
