import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
} from '@angular/material';

import { EventWarningComponent } from './event-warning.component';

describe('EventWarningComponent', () => {
  let component: EventWarningComponent;
  let fixture: ComponentFixture<EventWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventWarningComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
