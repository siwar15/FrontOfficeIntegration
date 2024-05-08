import { AddThemeComponent } from './../add-theme/add-theme.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Theme} from "../model/Theme";
import {ThemeService} from "../service/theme.service";
import {AddLevelComponent} from "../level/add-level/add-level.component";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  dialogRef: any;
  themes: Theme[] | undefined;
  username: string =" ";

  constructor(private dialog: MatDialog, private themeService: ThemeService,private userService: UserService) {}

  ngOnInit(): void {
    this.themeService.getThemes().subscribe(themes => {
      this.themes = themes;
      this.username = this.userService.getUsername();


    });
  }

  public openRegister() {
    this.dialogRef = this.dialog.open(AddThemeComponent, {
      width: '420px'
    });
  }

  addLevel(id: number) {
    this.dialogRef = this.dialog.open(AddLevelComponent, {
      width: '420px',
      data: {id}
    });
  }
}
