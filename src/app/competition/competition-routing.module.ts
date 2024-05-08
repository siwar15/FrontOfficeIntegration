import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CompetitionListComponent} from "./competition-list/competition-list.component";
import {EnumListComponent} from "./enum-list/enum-list.component";


const routes: Routes = [
 //{ path: 'afficher', component: CompetitionListComponent },
  { path: 'afficher/:type', component: CompetitionListComponent },
  { path: 'enum', component: EnumListComponent },



];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetitionRoutingModule { }
