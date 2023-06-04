import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-message',
  templateUrl: './employee-message.component.html',
  styleUrls: ['./employee-message.component.scss']
})
export class EmployeeMessageComponent implements OnInit {
  response: String = "";

  constructor(
    private router: Router,
    private userService: UserService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.userService.checkLogin().subscribe(
      (response: any) => {
        this.router.navigate(['employee/messaging']);
      },
      (error) => {
        this.router.navigate(['']);
      }
    );
  }

  sendMessage(data: any) {
    this.employeeService.sendMessage(data).subscribe(
      (response: any) => {
        this.response = response?.message;
      },
      (error) => {
        this.response = error.error?.message;
      }
    )
  }

  navigater(route: string) {
    this.router.navigate([route]);
  }

}
