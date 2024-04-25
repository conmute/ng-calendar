import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCurrentDateComponent } from './home-current-date.component';

describe('HomeCurrentDateComponent', () => {
  let component: HomeCurrentDateComponent;
  let fixture: ComponentFixture<HomeCurrentDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCurrentDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeCurrentDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
