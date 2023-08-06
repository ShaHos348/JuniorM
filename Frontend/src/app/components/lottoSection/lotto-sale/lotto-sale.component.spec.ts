import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoSaleComponent } from './lotto-sale.component';

describe('LottoSaleComponent', () => {
	let component: LottoSaleComponent;
	let fixture: ComponentFixture<LottoSaleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LottoSaleComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LottoSaleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
