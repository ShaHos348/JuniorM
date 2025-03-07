import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSignupComponent } from './employee-signup.component';

describe('EmployeeSignupComponent', () => {
	let component: EmployeeSignupComponent;
	let fixture: ComponentFixture<EmployeeSignupComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [EmployeeSignupComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(EmployeeSignupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
