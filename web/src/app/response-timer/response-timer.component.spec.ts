import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseTimerComponent } from './response-timer.component';

describe('ResponseTimerComponent', () => {
  let component: ResponseTimerComponent;
  let fixture: ComponentFixture<ResponseTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
