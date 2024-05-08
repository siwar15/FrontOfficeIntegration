import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Prize } from "../model/Prize";
import {CompetService} from "../service/Compet.Service";
import {AuthService} from "../service/auth.service";
@Component({
  selector: 'app-list-badge',
  templateUrl: './afficher-prix.component.html',
  styleUrls: ['./afficher-prix.component.css']
})
export class AfficherPrixComponent implements OnInit {
  userId: number | undefined; // Ajoutez une variable pour stocker l'ID de l'utilisateur
  prizes: Prize[] = []; // Ajoutez une variable pour stocker les prix

  constructor(private AuthService:AuthService,private route: ActivatedRoute, private competService: CompetService) { }

  ngOnInit(): void {


    this.AuthService.getCurrentUserId().subscribe(
      userId => {
        this.userId = userId;
        console.log('ID de l\'utilisateur connecté :', userId);
        this.competService.getPrizesByUserId(this.userId).subscribe(
          prizes => {
            this.prizes = prizes; // Mettez à jour la liste des prix
          },
          error => {
            console.error('Error loading prizes:', error);
          }
        );
      },

      error => {
        console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur :', error);
      }
    );
  }}
