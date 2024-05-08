import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionComponent } from '../add-question/add-question.component';
import {HistoryService} from "../service/history.service";
import {History} from "../model/History";
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";
import {Collection, NgxPaginationModule} from 'ngx-pagination'

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',

  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {
  get histories(): History[] | undefined {
    return this._histories;
  }

  set histories(value: History[]) {
    this._histories = value;
  }

  pageSize = 3;
  currentPage = 1;
  totalItems :number | undefined =0
  userUsername: string | undefined;
  dialogRef: any;
  private _histories: History[] | undefined;

  constructor(private dialog: MatDialog, private historyService: HistoryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userUsername = this.route.snapshot.params['userUsername'];
    this.historyService.getHistories(this.userUsername).subscribe(data => {
      this._histories = data;
    })
    this.totalItems = this._histories?.length;
  }


  protected readonly NgIf = NgIf;
}
