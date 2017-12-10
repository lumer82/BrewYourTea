import { RecentService } from './../shared/services/recent.service';
import { TimeParserService } from './../shared/services/time-parser.service';
import { NotificationService } from './../notification.service';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import {
  combineLatest,
  concat,
  distinctUntilChanged,
  filter,
  map,
  scan,
  share,
  startWith,
  switchMap,
  takeUntil,
  takeWhile
} from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { timer } from 'rxjs/observable/timer';
import { of } from 'rxjs/observable/of';

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

  constructor(private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private timeParserService: TimeParserService,
              private recentService: RecentService) {
  }

  ngOnInit() {
    this.name$ = this.activatedRoute.queryParamMap.pipe(map(m => m.get('name')));

    this.addToRecent();

    // calculate the steeping seconds
    const time$ = this.activatedRoute.paramMap.pipe(
      map(m => m.get('time')),
      map(m => this.timeParserService.parseTime(m))
    );

    // intervalFn creates a new timer depending on the targetTime
    const intervalFn = (targetTime: number) =>
      timer(0, 1000)
        .pipe(
          // Map to remaining seconds till targetTime
          map(() => Math.ceil((targetTime - Date.now()) / 1000)),
          // Only take a value if Date.now() is smaller than targettime
          takeWhile(x => x > 0),
          // Emit a value of zero a last time
          concat(of(0))
        );

    // timer counts the seconds down until the tea has steeped
    this.timer$ = this.restart$.pipe(
      // startWith is needed so the observable starts right away
      startWith(null),
      // switch to time information
      switchMap(() => time$),
      // calculate target time
      map(time => Date.now() + (time * 1000)),
      // start the interval
      switchMap(intervalFn),
      // timer only needs to be run once
      share()
    );

    // notify when the countdown reaches zero
    this.timer$
      .pipe(
        // only use a value of zero of timer
        filter(x => x === 0),
        // switch to current name of tea
        switchMap(() => this.name$),
        // remember unsubscribe
        takeUntil(this.unsubscribe$))
      .subscribe((name) => {
        this.notificationService.notify(
          `Finished ${name}`,
          `Hurry! Your tea "${name}" steeped long enough.`
        );
      });
  }

  /**
   * Subscribe to queryParams and params to add a new Tea to recents
   */
  private addToRecent() {
    this.activatedRoute.queryParamMap
      .pipe(
        combineLatest(this.activatedRoute.paramMap),
        // map both needed fields into on object
        map(([queryParamMap, paramMap]) => ({ name: queryParamMap.get('name'), time: paramMap.get('time')})),
        // only use the values if name and time is set
        filter(m => !!m.name && !!m.time),
        // return old value if nothing changed, else return the new object
        scan((acc, cur) => (acc.name !== cur.name || acc.time !== cur.time) ? cur : acc, { name: undefined, time: undefined}),
        // only continue if its a new value
        distinctUntilChanged()
      )
      // if a new value gets emitted, add it to recents
      .subscribe(setup => this.recentService.addToRecent(setup));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}
