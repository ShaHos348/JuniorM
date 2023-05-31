import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: string = "";

  constructor(private dialog:MatDialog,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService.checkLogin().subscribe(
      (response: any) => {
        this.router.navigate(['home']);
        this.user = response.message;
      },
      (error) => {
        this.router.navigate(['']);
      }
    );
  }

  logout() {
    this.userService.logout().subscribe(
      (Response) => {
        this.router.navigate(['']);
      });
  }

  navigater(route: string) {
    this.router.navigate([route]);
  }

}
