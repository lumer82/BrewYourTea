import { RouterTestingModule } from '@angular/router/testing';
import { BackButtonComponent } from './../shared/components/back-button/back-button.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { LicensesComponent } from './licenses.component';

describe('LicensesComponent', () => {
  let component: LicensesComponent;
  let fixture: ComponentFixture<LicensesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          LicensesComponent
        ],
        imports: [
          RouterTestingModule
        ],
        schemas: [
          NO_ERRORS_SCHEMA
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
