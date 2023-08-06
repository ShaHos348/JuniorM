import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoPrintComponent } from './lotto-print.component';

describe('LottoPrintComponent', () => {
	let component: LottoPrintComponent;
	let fixture: ComponentFixture<LottoPrintComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LottoPrintComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LottoPrintComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
