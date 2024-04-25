import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayviewSchedulerComponent } from './dayview-scheduler.component';

describe('DayviewSchedulerComponent', () => {
  let component: DayviewSchedulerComponent;
  let fixture: ComponentFixture<DayviewSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayviewSchedulerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayviewSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
