import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMessageComponent } from './employee-message.component';

describe('EmployeeMessageComponent', () => {
	let component: EmployeeMessageComponent;
	let fixture: ComponentFixture<EmployeeMessageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [EmployeeMessageComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(EmployeeMessageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
