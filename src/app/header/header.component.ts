import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import {Router, RouterLink} from "@angular/router";
import {NgOptimizedImage, UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

  standalone: true,
  imports: [
    RouterLink,
    UpperCasePipe,
    NgOptimizedImage
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dialogRef: any;

  constructor(private dialog: MatDialog , private router: Router) {}

    // tslint:disable-next-line: typedef
    public openRegister() {
    this.dialogRef = this.dialog.open(RegisterComponent, {
      width: '420px'
    });
  }
  ngOnInit(): void {
  }
  navigateToLogin() {
    this.router.navigate(['login']);
  }

}
