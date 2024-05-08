import { Component, OnInit } from '@angular/core';
import {Level} from "../model/Level";
import {LevelService} from "../service/level.service";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {AddQuestionComponent} from "../add-question/add-question.component";
import {MatDialog} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgForOf
  ],
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {
  levels: Level[] | undefined;
  idTheme: number | undefined;
  dialogRef: any;

  constructor(private levelService: LevelService, private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.params.subscribe(
      params => {
        this.idTheme = this.route.snapshot.params['id'];
        this.levelService.getLevels(this.idTheme).subscribe(levels => {
          this.levels = levels;
        })
      }
    )
  }

  ngOnInit(): void {

  }
  public openRegister(id:number) {
    this.dialogRef = this.dialog.open(AddQuestionComponent, {
      width: '500px',
      data: {id}
    });
  }
}
