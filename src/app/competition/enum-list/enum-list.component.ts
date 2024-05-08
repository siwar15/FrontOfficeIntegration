import {Component, OnInit} from '@angular/core';





import {ActivatedRoute, Router} from '@angular/router';

import {CompetService} from "../../service/Compet.Service";
import {User} from "../../model/User";
import {TypeService} from "../../service/type.Service";



@Component({
  selector: 'app-enum-list',
  templateUrl: './enum-list.component.html',
  styleUrls: ['./enum-list.component.css']
})
export class EnumListComponent implements OnInit {
  users: User[] = [];
 // enumValues: string[] = [];
  enumValues: string[] = ['Quiz','Hackathon','Projet','Débat','Tournoi',' Défi_de_codage'];
  competitions: any[] = []; // Pour stocker les compétitions associées au type sélectionné
  showCompetitionDetails: boolean = false;

  constructor(private typeService: TypeService, private competService: CompetService,private router: Router,private route: ActivatedRoute) {}
  userId: number = 0;

  selectType(type: string) {
 // this.typeService.changeType(type); // Appelle changeType du service TypeService
    this.router.navigate(['/afficher', type]);
    //console.error(userId)


    }



  ngOnInit(): void {
    this.competService.getAllUsers().subscribe(
      users => {
        this.users = users;
        console.log('Liste des utilisateurs:', users);
      },
      error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    );
  }
  getImageUrl(type: string): string {
    // Déterminez le chemin de l'image en fonction du type
    switch (type) {
      case 'Hackathon':
        return 'assets/img/gallery/hakaton.jpg';
      case 'Quiz':
        return 'assets/img/gallery/quiz.jpg';

      case 'Projet':
        return 'assets/img/gallery/projet.jpg';
      case 'Tournoi':
        return 'assets/img/gallery/tournoi.jpg';
      case 'Débat':
        return 'assets/img/gallery/debat.jpg';
      // Ajoutez d'autres cas pour les autres types si nécessaire
      default:
        return 'assets/img/gallery/codage.jpg'; // Image par défaut si le type n'est pas trouvé
    }
  }


  navigatetobadge() {
    // Extraire l'ID de l'URL
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      // Naviguer vers la nouvelle route en utilisant l'ID
      this.router.navigate(['/prix', userId]);
    });
  }




}
