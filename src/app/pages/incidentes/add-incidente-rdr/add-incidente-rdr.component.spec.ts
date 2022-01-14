import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncidenteRdrComponent } from './add-incidente-rdr.component';

describe('AddIncidenteRdrComponent', () => {
  let component: AddIncidenteRdrComponent;
  let fixture: ComponentFixture<AddIncidenteRdrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIncidenteRdrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIncidenteRdrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
