import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoActiveComponent } from './lotto-active.component';

describe('LottoActiveComponent', () => {
  let component: LottoActiveComponent;
  let fixture: ComponentFixture<LottoActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LottoActiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LottoActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
