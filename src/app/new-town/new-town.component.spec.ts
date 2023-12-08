import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTownComponent } from './new-town.component';

describe('NewTownComponent', () => {
  let component: NewTownComponent;
  let fixture: ComponentFixture<NewTownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
