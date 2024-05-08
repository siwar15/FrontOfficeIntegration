import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {CompetService} from "../service/Compet.Service";
import {User} from "../model/User";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  userId: number | undefined; // ID de l'utilisateur dont vous voulez obtenir les amis
  friends: User[] = [];

  constructor( private AuthService:AuthService,private competService: CompetService, private route: ActivatedRoute) { }

  ngOnInit(): void {

      this.getUserFriends();
    this.AuthService.getCurrentUserId().subscribe(
      userId => {
        this.userId = userId;
        console.log('ID de l\'utilisateur connecté :', userId);
      },
      error => {
        console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur :', error);
      }
    );
  }

  getUserFriends(): void {
    if (this.userId) {
      this.competService.getUserFriends(this.userId)
        .subscribe(
          friends => {
            this.friends = friends;
            console.log('Amis de l\'utilisateur:', friends);
          },
          error => {
            console.error('Erreur lors de la récupération des amis:', error);
          }
        );
    }
  }
}
