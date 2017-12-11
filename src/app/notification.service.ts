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
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
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
    /* tslint:disable-next-line:no-unused-expression */
    new Notification(title, this.getNotificationOptions(body));
  }

  private getNotificationOptions(body: string): NotificationOptions & { requireInteraction: boolean, vibrate: Array<number>, badge: string } {
    return {
      body: body,
      icon: 'assets/images/icons/icon-128x128.png',
      badge: 'assets/images/icons/icon-96x96.png',
      requireInteraction: true,
      vibrate: [300, 100, 400]
    };
  }

}
