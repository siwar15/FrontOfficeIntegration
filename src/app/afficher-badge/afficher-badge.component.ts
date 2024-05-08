import { Component, OnInit } from '@angular/core';

import {AuthService} from "../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Badge} from "../model/Badge";
import {BadgeService} from "../service/Badge.service";



@Component({
  selector: 'app-list-badge',
  templateUrl: './afficher-badge.component.html',
  styleUrls: ['./afficher-badge.component.css']
})
export class AfficherBadgeComponent implements OnInit {
  userId: number | undefined;
  badges: Badge[] | undefined;
  selectedBadge: Badge | null = null;

  notificationActive = false;
  successMessage: string | null = ''; // Déclare successMessage comme étant soit une chaîne de caractères, soit null

  closeNotification() {
    this.successMessage = null; // Efface le contenu de la notification en lui attribuant null
  }

  constructor(private AuthService:AuthService,private badgeService: BadgeService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {


    this.AuthService.getCurrentUserId().subscribe(
      userId => {
        this.userId = userId;
        console.log('ID de l\'utilisateur connecté :', userId);
        this.badgeService.assignRandomPrizeIfThresholdReached(this.userId).subscribe(
          (response) => {
            console.log(response);
            if (response) {
              // Obtenez les données du prix à partir de la réponse
              const prizeName = response.name; // Nom du prix


              const prizeDescription = response.description; // Description du prix
              const prizeValue = response.value; // Valeur du prix

              // Affectez le message de succès à la variable successMessage
              this.successMessage = `Félicitations ! Vous avez gagné un ${prizeName} d'une valeur de ${prizeValue} avec la description : ${prizeDescription} !`;
              console.log('affcteeee');
            }
          },
          (error) => {


            console.error('Une erreur s\'est produite lors de la vérification du prix :', error);

          }
        );
        this.badgeService.getBadgesByUserId(this.userId).subscribe(
          (data: Badge[]) => {
            this.badges = data;

          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur :', error);
      }

    );
      // Charger les badges pour cet utilisateur
    // @ts-ignore



      // @ts-ignore






  }







  handleBadgeClick(badge: Badge) {
    // Affectez le badge sélectionné
    this.selectedBadge = badge;
    // Ouvrez la fenêtre modale
    // Vous pouvez implémenter la logique pour ouvrir la fenêtre modale ici
  }
  closeModal() {
    this.selectedBadge = null;
  }

  // Dans votre composant Angular

}
