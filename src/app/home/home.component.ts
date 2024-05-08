import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

  imports: [
    FormsModule,
    HeaderComponent
  ],
  standalone: true,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adminUsername = '';
  userUsername = '';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  adminLogin(adminUsername: string) {
    if(adminUsername==="admin") {
      window.location.replace("/questions");
    } else {
      alert('Please enter correct username')
    }
  }
  userLogin(userUsername: string | any[]) {
    console.log(userUsername.length)
    if(userUsername.length < 2) {
      alert('Please enter correct username')
    } else {
      this.userService.saveUsername(userUsername);
       window.location.replace(`/historique/${userUsername}`);
    }
  }
}
