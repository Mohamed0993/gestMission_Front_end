import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentValideComponent } from './assignment-valide.component';

describe('AssignmentValideComponent', () => {
  let component: AssignmentValideComponent;
  let fixture: ComponentFixture<AssignmentValideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentValideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentValideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
