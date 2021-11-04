import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddincidenteComponent } from './addincidente.component';

describe('AddincidenteComponent', () => {
  let component: AddincidenteComponent;
  let fixture: ComponentFixture<AddincidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddincidenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddincidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
