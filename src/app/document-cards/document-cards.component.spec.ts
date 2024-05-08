import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCardsComponent } from './document-cards.component';

describe('DocumentCardsComponent', () => {
  let component: DocumentCardsComponent;
  let fixture: ComponentFixture<DocumentCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
