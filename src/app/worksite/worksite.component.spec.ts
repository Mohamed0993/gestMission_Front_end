import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksiteComponent } from './worksite.component';

describe('WorksiteComponent', () => {
  let component: WorksiteComponent;
  let fixture: ComponentFixture<WorksiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorksiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
