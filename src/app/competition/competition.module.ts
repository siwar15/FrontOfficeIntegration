import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompetitionRoutingModule } from './competition-routing.module';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { CompetitionAddComponent } from './competition-add/competition-add.component';
import {EnumListComponent} from "./enum-list/enum-list.component";
import {competitionComponent} from './competition.component';


;

@NgModule({
  declarations: [
    // CompetitionListComponent,
   // CompetitionAddComponent,
    //EnumListComponent,
   competitionComponent,
  //  SubscriptionDialogComponent


  ],
  exports: [


   //y EnumListComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,



]
})
export class CompetitionModule { }
