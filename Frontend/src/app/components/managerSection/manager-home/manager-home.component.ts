import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-manager-home',
	templateUrl: './manager-home.component.html',
	styleUrls: ['./manager-home.component.scss'],
})
export class ManagerHomeComponent implements OnInit {
	user: string = '';

	constructor(
		private dialog: MatDialog,
		private router: Router,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.userService.managerCheckLogin().subscribe(
			(response: any) => {
				this.router.navigate(['manager/home']);
				this.user = response.message;
			},
			(error) => {
				this.router.navigate(['home']);
			}
		);
	}

	logout() {
		this.userService.managerLogout().subscribe((Response) => {
			this.router.navigate(['home']);
		});
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
