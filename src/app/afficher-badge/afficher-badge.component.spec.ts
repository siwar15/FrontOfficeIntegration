import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherBadgeComponent } from './afficher-badge.component';

describe('ListBadgeComponent', () => {
  let component: AfficherBadgeComponent;
  let fixture: ComponentFixture<AfficherBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherBadgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
