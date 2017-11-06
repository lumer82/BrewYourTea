import { TimerComponent } from './../../timer/timer.component';
import { MinutesAndSecondsPipe } from './../../shared/pipes/minutes-and-seconds.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { PresetComponent } from './preset.component';

@Component({
  template: ''
})
class BlankComponent {}

xdescribe('PresetComponent', () => {
  let component: PresetComponent;
  let fixture: ComponentFixture<PresetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresetComponent, MinutesAndSecondsPipe, BlankComponent ],
      imports: [ RouterTestingModule.withRoutes([{path: 'timer/:time', component: BlankComponent}]) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
