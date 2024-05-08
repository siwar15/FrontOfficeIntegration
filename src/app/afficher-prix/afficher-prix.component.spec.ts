import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherPrixComponent } from './afficher-prix.component';

describe('ListBadgeComponent', () => {
  let component: AfficherPrixComponent;
  let fixture: ComponentFixture<AfficherPrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherPrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherPrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
