import { AddThemeComponent } from './add-theme/add-theme.component';
import { ResponsesComponent } from './responses/responses.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ThemeContentComponent } from './theme-content/theme-content.component';
import { ThemeComponent } from './theme/theme.component';
import { QuizzComponent } from './quizz/quizz.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HistoriqueComponent } from './historique/historique.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionContentComponent } from './question-content/question-content.component';
import {LevelComponent} from "./level/level.component";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CourseCardsComponent } from './course-cards/course-cards.component';
import { DocumentCardsComponent } from './document-cards/document-cards.component';
import {AfficherPrixComponent} from "./afficher-prix/afficher-prix.component";
import {AfficherBadgeComponent} from "./afficher-badge/afficher-badge.component";
import {CompetitionListComponent} from "./competition/competition-list/competition-list.component";
import {EnumListComponent} from "./competition/enum-list/enum-list.component";
import {FriendsComponent} from "./friends/friends.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'course', component: CourseCardsComponent},
  {path: 'document', component: DocumentCardsComponent},
  { path: 'document/:courseID', component: DocumentCardsComponent },
  {path: 'historique/:userUsername', component: HistoriqueComponent },
  {path: 'quizz/:idLevel', component: QuizzComponent},
  {path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'prix', component:AfficherPrixComponent},
  { path: 'badgefront', component: AfficherBadgeComponent },
  { path: 'afficher/:type', component: CompetitionListComponent },
  { path: 'enum', component: EnumListComponent },
  {path: 'friend/id:', component: FriendsComponent},
  {path: 'theme', component: ThemeComponent,


   children: [

    {path: 'themeContent/:id', component: ThemeContentComponent},
    {path: '', component: WelcomeComponent}
   ]
  },
  {
    path: 'questions',
    component: QuestionsComponent,
   children: [
    {path: '', component: WelcomeComponent},
    {path: 'level/:id', component: LevelComponent,
      children: [
        {path: 'questionContent/:id', component: QuestionContentComponent}
      ]},
     {
       path: 'responses/:id', component: ResponsesComponent
     }

   ]
  }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
