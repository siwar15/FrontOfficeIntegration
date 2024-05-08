import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistoriqueComponent } from './historique/historique.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { QuizzComponent } from './quizz/quizz.component';
import { ThemeComponent } from './theme/theme.component';
import { ThemeContentComponent } from './theme-content/theme-content.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ResultComponent } from './result/result.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionContentComponent } from './question-content/question-content.component';
import { ResponsesComponent } from './responses/responses.component';
import {NgxPaginationModule} from 'ngx-pagination';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { LevelComponent } from './level/level.component';
import { AddLevelComponent } from './level/add-level/add-level.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AddQuestionComponent} from "./add-question/add-question.component";
import {AddThemeComponent} from "./add-theme/add-theme.component";
import {NgOptimizedImage} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CourseCardsComponent } from './course-cards/course-cards.component';
import { DocumentCardsComponent } from './document-cards/document-cards.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import {EnumListComponent} from "./competition/enum-list/enum-list.component";
import {FriendsComponent} from "./friends/friends.component";
import {AfficherBadgeComponent} from "./afficher-badge/afficher-badge.component";
import {AfficherPrixComponent} from "./afficher-prix/afficher-prix.component";




@NgModule({
  declarations: [
    AfficherPrixComponent,
    AfficherBadgeComponent,
    FriendsComponent,
    EnumListComponent,
    AppComponent,
    HistoriqueComponent,
    RegisterComponent,
    QuizzComponent,
    ThemeComponent,
    ThemeContentComponent,
    WelcomeComponent,
    ResultComponent,
    QuestionsComponent,
    QuestionContentComponent,
    ResponsesComponent,
    AddThemeComponent,
    SignupComponent,
    LoginComponent,
    CourseCardsComponent,
    DocumentCardsComponent,
    CourseDetailsComponent,
  ],
    imports: [
        BrowserModule,
        MatDialogModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        MatRadioModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        AddQuestionComponent,
        HomeComponent,
        HeaderComponent,
        LevelComponent,
        AddLevelComponent,
        NgOptimizedImage,
        NgxPaginationModule,
        MatPaginator,
        ReactiveFormsModule


    ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ],
 /* entryComponents: [
    AddQuestionComponent,
    AddThemeComponent
  ],*/
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
