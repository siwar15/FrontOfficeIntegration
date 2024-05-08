import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import {Router, RouterLink} from "@angular/router";
import {NgOptimizedImage, UpperCasePipe} from "@angular/common";
import { CommonModule } from '@angular/common'; // Add this line
import { AuthService } from '../service/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

  standalone: true,
  imports: [
    RouterLink,
    UpperCasePipe,
    NgOptimizedImage,
    CommonModule
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dialogRef: any;

  isLoggedIn = false;

  constructor(private dialog: MatDialog , private router: Router, private auth: AuthService, private cd: ChangeDetectorRef) {
    this.auth.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.cd.detectChanges(); // Trigger change detection
    });  }

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
    this.isLoggedIn = true;
    this.cd.detectChanges(); // Trigger change detection

  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }






}
