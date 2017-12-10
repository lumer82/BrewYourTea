import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  private _granted = (<any>Notification).permission === 'granted';

  constructor() {
    this.requestPermission();
  }

  private requestPermission(): void {
    if ('Notification' in window && (<any>Notification).permission === 'default') {
      Notification.requestPermission().then(result => this._granted = result === 'granted');
    }
  }

  notify(title: string, body: string): void {
    if (!this._granted) {
      return;
    }

    if ('serviceWorker' in navigator) {
      console.log('trying serviceWorker');
      navigator.serviceWorker.getRegistration().then(registration => {
        console.log('got registration', registration);
        if (registration) {
          console.log('show by serviceworker');
          registration.showNotification(title, this.getNotificationOptions(body));
        } else {
          this.showLocalNotification(title, body);
        }
      });
    } else {
      this.showLocalNotification(title, body);
    }
  }

  private showLocalNotification(title: string, body: string): void {
    console.log('show by local notification');
    /* tslint:disable-next-line:no-unused-expression */
    new Notification(title, this.getNotificationOptions(body));
  }

  private getNotificationOptions(body: string): NotificationOptions & { requireInteraction: boolean, vibrate: Array<number> } {
    return {
      body: body,
      icon: 'assets/images/favicon/android-chrome-192x192.png',
      requireInteraction: true,
      vibrate: [300, 100, 400]
    };
  }

}
