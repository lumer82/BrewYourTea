import { RecentService } from './../shared/services/recent.service';
import { TimeParserService } from './../shared/services/time-parser.service';
import { NotificationService } from './../notification.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  map,
  switchMap,
  takeWhile,
  takeUntil,
  withLatestFrom,
  filter,
  tap,
  distinctUntilChanged,
  startWith
} from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'tea-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject<void>();
  timer$: Observable<number>;
  name$: Observable<string>;
  restart$: Subject<void> = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private timeParserService: TimeParserService,
    private recentService: RecentService
  ) {}

  ngOnInit() {
    this.name$ = this.activatedRoute.queryParamMap.pipe(map(m => m.get('name')));

    this.activatedRoute.queryParamMap
      .pipe(
        filter(m => !!m.get('name')),
        map(m => m.get('name')),
        withLatestFrom(this.activatedRoute.paramMap.pipe(
          filter(m => !!m.get('time')),
          map(m => m.get('time'))
        )),
        map(([name, time]) => ({ name, time}))
      )
      .subscribe((setup) => {
        this.recentService.addToRecent(setup);
      });

    const time$ = this.activatedRoute.paramMap.pipe(
      map(m => m.get('time')),
      map(m => this.timeParserService.parseTime(m))
    );

    const interval$ = this.restart$.pipe(
      startWith(null),
      switchMap(() => timer(0, 1000).pipe(
        withLatestFrom(time$),
        takeWhile(([x, time]) => x <= time),
        map(([x, time]) => x)
      ))
  );

    this.timer$ = time$.pipe(
      switchMap(() =>
        interval$.pipe(withLatestFrom(time$), map(([x, time]) => time - x))
      )
    );

    const finished$ = this.timer$
      .pipe(
        filter(x => x === 0),
        switchMap(() => this.name$),
        takeUntil(this.unsubscribe$))
      .subscribe((name) => {
        this.notificationService.notify(
          `Finished ${name}`,
          `Hurry! Your tea "${name}" steeped long enough.`
        );
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}
