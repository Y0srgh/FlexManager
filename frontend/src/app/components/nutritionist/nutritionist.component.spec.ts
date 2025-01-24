import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionistsComponent } from './nutritionist.component';

describe('NutritionistsComponent', () => {
  let component: NutritionistsComponent;
  let fixture: ComponentFixture<NutritionistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutritionistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
