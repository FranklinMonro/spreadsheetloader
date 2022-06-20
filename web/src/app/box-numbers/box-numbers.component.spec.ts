import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxNumbersComponent } from './box-numbers.component';

describe('BoxNumbersComponent', () => {
  let component: BoxNumbersComponent;
  let fixture: ComponentFixture<BoxNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxNumbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
