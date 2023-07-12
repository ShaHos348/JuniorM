import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-clockin-out',
	templateUrl: './clockin-out.component.html',
	styleUrls: ['./clockin-out.component.scss'],
})
export class ClockinOutComponent implements OnInit {
	messages: any;
	response: String = '';
	clock: String = '';
	clocked: boolean = false;
	idnum: string = '';

	constructor(
		private router: Router,
		private userService: UserService,
		private employeeService: EmployeeService
	) {}

	ngOnInit(): void {
		this.userService.checkLogin().subscribe(
			(response: any) => {
				this.router.navigate(['employee/clocking']);
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	lookup(data: any) {
		let clocker = document.getElementById('clocker') as HTMLElement;
		let messagesTable = document.getElementById('messageTable') as HTMLElement;
		messagesTable.style.display = 'none';
		this.employeeService.lookup(data).subscribe(
			(response: any) => {
				this.clock = response?.message;
				this.clocked = response?.clocked;
				clocker.style.display = 'initial';
				if (this.clocked) {
					clocker.style.backgroundColor = 'red';
				} else {
					clocker.style.backgroundColor = 'lime';
				}
				this.idnum = data.idnum;
				this.response = '';
			},
			(error) => {
				this.response = error.error?.message;
				this.clock = '';
				this.idnum = '';
				clocker.style.display = 'none';
			}
		);
	}

	clocker() {
		let clocker = document.getElementById('clocker') as HTMLElement;
		let data = {
			idnum: this.idnum,
			clockedin: this.clocked,
		};
		this.employeeService.clocker(data).subscribe((response: any) => {
			this.response = response?.message;
			this.getMessages(data);
			this.idnum = '';
			clocker.style.display = 'none';
		});
	}

	getMessages(data: any) {
		let messagesTable = document.getElementById('messageTable') as HTMLElement;
		this.employeeService.getMessages(data).subscribe((response: any) => {
			this.messages = response;
			if (this.messages.length != 0) {
				for (let index = 0; index < this.messages.length; index++) {
					const message = this.messages[index];
					let hour = Number(message.date.substring(11,13));
					var AmOrPm = hour >= 12 ? 'PM' : 'AM';
					hour = (hour % 12) || 12;
					message.date = message.date.substring(0,10) + " " + hour + message.date.substring(13,16) + " " + AmOrPm;
				}
				messagesTable.style.display = 'table';
			}
		});
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
