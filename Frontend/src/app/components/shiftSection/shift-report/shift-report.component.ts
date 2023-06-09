import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shift-report',
  templateUrl: './shift-report.component.html',
  styleUrls: ['./shift-report.component.scss']
})
export class ShiftReportComponent implements OnInit {

	listOfTen = new Array(10);
	amountNames: any [] = ["Grocery:", "Tax:", "Lotto On:","Lotto In:","Gasoline:","Money Order:","Paid In:","Total:"];
	amountTypeNames: any [] = ["Cash:", "Check:", "Debit:","Credit:","Mobile:","EBT:","Lotto Pay On:","Lotto Pay In:","Payout:","Total:"];

  constructor() { }

  ngOnInit(): void {
  }



}
