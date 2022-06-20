import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartloadproductsComponent } from './smartloadproducts.component';

describe('SmartloadproductsComponent', () => {
  let component: SmartloadproductsComponent;
  let fixture: ComponentFixture<SmartloadproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartloadproductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartloadproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
