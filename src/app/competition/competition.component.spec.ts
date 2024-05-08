import { ComponentFixture, TestBed } from '@angular/core/testing';
import {competitionComponent} from "./competition.component";



describe('CompetitionComponent', () => {
  let component: competitionComponent;
  let fixture: ComponentFixture<competitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ competitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(competitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
