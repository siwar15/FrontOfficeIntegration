import {Component, NgModule, OnInit} from '@angular/core';


import {ActivatedRoute, Router, RouterLink} from "@angular/router";

import {CommonModule, DatePipe, NgClass} from '@angular/common';
import {FormsModule} from "@angular/forms";

import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {Competition} from "../../model/Competition";
import {CompetService} from "../../service/Compet.Service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    DatePipe,
    CommonModule,
    RouterLink
  ],
  styleUrls: ['./competition-list.component.css']
})

 // declarations: [CompetitionListComponent],

  // Autres imports, déclarations et fournisseurs...
export class CompetitionListComponent implements OnInit {
  competitions!: Competition[];
  successMessage: string | null = null;
  showSubscriptionForm: boolean = false;
  userName: string = ''; // Déclarer userName
  userEmail: string = ''; // Déclarer userEmail
  userId: number | undefined;
  competitionId: number | undefined;
  userFriendId: number | undefined;
  submittedStatus: boolean[] = [];
  userAlreadyRegistered: boolean[] = [];
  isExpanded: boolean = false;
  friendEmail: string | undefined;

  constructor(private AuthService:AuthService,private http: HttpClient, private snackBar: MatSnackBar, private competService: CompetService, private router: Router, private route: ActivatedRoute,) {
  }


  ngOnInit(): void {


    this.route.params.subscribe(params => {
      const type = params['type'];
      console.error(type)
      //  const type : string = 'Quiz';
      console.log('Fetched competii data:', type);



        this.AuthService.getCurrentUserId().subscribe(
          userId => {
            this.userId = userId;
            console.log('ID de l\'utilisateur connecté :', userId);
          },
          error => {
            console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur :', error);
          }
        );



      this.competService.getCompetitionsByType(type).subscribe(
        data => {
          this.competitions = data;
          console.error(data)
          this.competitions.forEach(competition => {
            this.checkUserRegistration(competition.idC);

          });

        },
        error => {
          console.error('Une erreur s\'est produite : ', error);
        }
      );
    });
  }

  onSubmit(competitionId: number, userId: number | undefined): void {
    this.competService.addUserToCompetition(competitionId,  this.userId).subscribe(response => {
    }, error => {
      console.error('deja mawjouda raw:', error);
      this.successMessage = 'Vous avez été inscrit avec succès à la compétition !';
      this.userAlreadyRegistered[competitionId] = true;
      this.competitionId = competitionId;


    });
  }


  checkUserRegistration(competitionId: number) {
    this.competService.isUserAlreadyRegistered(competitionId, this.userId).subscribe(
      (isRegistered: boolean) => {
        // Si l'utilisateur est déjà inscrit, marquez la compétition comme telle
        this.userAlreadyRegistered[competitionId] = isRegistered;
      },
      error => {
        console.error('Erreur lors de la vérification de l inscription de l utilisateur à la compétition:', error);
      }
    );
  }


  closeNotification(): void {
    // Fermer la notification en réinitialisant la variable de succès
    this.successMessage = null;
  }

  expandNotification() {
    this.isExpanded = true;
  }

  sendInvitation(): void {
    // Vérifier si l'e-mail est valide en utilisant une expression régulière
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(<string>this.friendEmail)) {
      // Afficher un message d'erreur si l'e-mail n'est pas valide
      this.snackBar.open('L\'adresse e-mail spécifiée n\'est pas valide', 'Fermer', {duration: 3000});
      return;
    }

    // Vérifier si l'e-mail existe dans votre système
    this.competService.getUserFriendIdByEmail(this.friendEmail).subscribe(
      userFriendId => {
        this.userFriendId = userFriendId;
        console.log( this.userFriendId)

        if (userFriendId) {
          // L'e-mail existe, vous pouvez envoyer l'invitation
          this.competService.sendNotificationByEmail(this.friendEmail, this.userId, userFriendId, this.competitionId).subscribe(
            (response) => {
              // Affichez un message de succès à l'utilisateur lorsque l'invitation est envoyée avec succès
              this.snackBar.open('Invitation envoyée avec succès', 'Fermer', {duration: 3000});
            },
            (error) => {
              console.error('Invitation envoyée avec succès:', error);
              // Gérer les erreurs (par exemple, afficher un message d'erreur à l'utilisateur)
              this.snackBar.open('Invitation envoyée avec succès:', 'Fermer', {duration: 3000});
            }
          );
        } else {
          // L'e-mail n'existe pas, afficher un message à l'utilisateur
          this.snackBar.open('L\'adresse e-mail spécifiée n\'existe pas dans notre système', 'Fermer', {duration: 3000});
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'ID de l\'ami :', error);
        // Gérer les erreurs (par exemple, afficher un message d'erreur à l'utilisateur)
        this.snackBar.open('Une erreur s\'est produite lors de la récupération de l\'ID de l\'ami', 'Fermer', {duration: 3000});
      }
    );
  }
}
