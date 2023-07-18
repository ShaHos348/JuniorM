import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmployeeMessagesComponent } from './all-employee-messages.component';

describe('AllEmployeeMessagesComponent', () => {
  let component: AllEmployeeMessagesComponent;
  let fixture: ComponentFixture<AllEmployeeMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllEmployeeMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEmployeeMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
