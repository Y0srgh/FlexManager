import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressFormDialogComponent } from './progress-form-dialog.component';

describe('ProgressFormDialogComponent', () => {
  let component: ProgressFormDialogComponent;
  let fixture: ComponentFixture<ProgressFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
