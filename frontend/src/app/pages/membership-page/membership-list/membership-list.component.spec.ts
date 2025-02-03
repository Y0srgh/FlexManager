import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberShipComponent } from './membership-list.component';

describe('MemberShipComponent', () => {
  let component: MemberShipComponent;
  let fixture: ComponentFixture<MemberShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberShipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
