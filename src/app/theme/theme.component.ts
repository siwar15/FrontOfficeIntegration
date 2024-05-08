import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Theme} from "../model/Theme";
import {ThemeService} from "../service/theme.service";
import {ActivatedRoute} from "@angular/router";
import {PaginationInstance} from "ngx-pagination";


@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  @ViewChild('buttons', { static: true }) buttons: ElementRef | undefined;
  themes: Theme[] | undefined;
  userUsername: string | undefined;
  pageSize = 3;
  currentPage = 1;
  totalItems :number | undefined =0
  x =0 ;
  startIndex = 0;
  constructor(private themeService: ThemeService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.userUsername = this.route.snapshot.params['userUsername'];
    this.themeService.getThemes().subscribe(themes => {
      this.themes = themes;
      this.totalItems = this.themes?.length;
    });
  }

  onPageChange(event: number) {
    this.currentPage = event
    this.startIndex = (this.currentPage - 1) * this.pageSize; // Reset starting index
  }
  switchToNext(event: Event) {
    const clickedButton = event.target as HTMLElement;

    if (clickedButton.classList.contains('active')) {
      return;
    }

    const activeButton = this.buttons?.nativeElement.querySelector('.button.active');
    if (activeButton) {
      activeButton.classList.remove('active');
    }

    clickedButton.classList.add('active');





  }



}
