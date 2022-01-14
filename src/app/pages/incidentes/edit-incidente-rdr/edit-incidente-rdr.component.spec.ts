import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIncidenteRdrComponent } from './edit-incidente-rdr.component';

describe('EditIncidenteRdrComponent', () => {
  let component: EditIncidenteRdrComponent;
  let fixture: ComponentFixture<EditIncidenteRdrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIncidenteRdrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIncidenteRdrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
