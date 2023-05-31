import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockinOutComponent } from './clockin-out.component';

describe('ClockinOutComponent', () => {
  let component: ClockinOutComponent;
  let fixture: ComponentFixture<ClockinOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockinOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockinOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
