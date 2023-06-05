import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessFPComponent } from './business-fp.component';

describe('BusinessFPComponent', () => {
	let component: BusinessFPComponent;
	let fixture: ComponentFixture<BusinessFPComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BusinessFPComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BusinessFPComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
