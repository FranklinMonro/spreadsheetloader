import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorecampaignsComponent } from './storecampaigns.component';

describe('StorecampaignsComponent', () => {
  let component: StorecampaignsComponent;
  let fixture: ComponentFixture<StorecampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorecampaignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorecampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
