import { NotificationService } from './../notification.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from './../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimerComponent
       ],
       imports: [
         SharedModule,
         RouterTestingModule
       ],
       providers: [
          { provide: NotificationService, useValue: { notify: (title: string, body: string) => {}} }
       ],
       schemas: [ NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
