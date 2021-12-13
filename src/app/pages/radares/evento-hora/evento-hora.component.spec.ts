import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoHoraComponent } from './evento-hora.component';

describe('EventoHoraComponent', () => {
  let component: EventoHoraComponent;
  let fixture: ComponentFixture<EventoHoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoHoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
