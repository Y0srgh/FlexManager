import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAssociationComponent } from './child-association.component';

describe('ChildAssociationComponent', () => {
  let component: ChildAssociationComponent;
  let fixture: ComponentFixture<ChildAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
