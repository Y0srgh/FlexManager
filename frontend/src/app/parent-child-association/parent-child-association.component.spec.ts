import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentChildAssociationComponent } from './parent-child-association.component';

describe('ParentChildAssociationComponent', () => {
  let component: ParentChildAssociationComponent;
  let fixture: ComponentFixture<ParentChildAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentChildAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentChildAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
