import { NotificationService } from './../notification.service';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap, takeWhile, takeUntil, withLatestFrom, filter, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'tea-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject<void>();
  timer$: Observable<number>;

  constructor(private activatedRoute: ActivatedRoute, private notificationService: NotificationService) {}

  ngOnInit() {
    const time$ = this.activatedRoute.paramMap.pipe(map(m => +m.get('time')));

    const interval$ = interval(1000).pipe(
      withLatestFrom(time$),
      takeWhile(([x, time]) => x <= time),
      map(([x, time]) => x)
    );

    this.timer$ = time$.pipe(
      switchMap(() => interval$.pipe(
        withLatestFrom(time$),
        map(([x, time]) => time - x)
      ))
    );

    const finished$ = this.timer$.pipe(
      filter(x => x === 0),
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.notificationService.notify('Finished', 'Hurry! Your tea steeped long enough.');
    });
  }



  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}
