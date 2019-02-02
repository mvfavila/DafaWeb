import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventWarningsComponent } from './event-warnings.component';

describe('EventWarningsComponent', () => {
  let component: EventWarningsComponent;
  let fixture: ComponentFixture<EventWarningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventWarningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventWarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
