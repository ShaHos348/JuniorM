import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoRegistryComponent } from './lotto-registry.component';

describe('LottoRegistryComponent', () => {
  let component: LottoRegistryComponent;
  let fixture: ComponentFixture<LottoRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LottoRegistryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LottoRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
