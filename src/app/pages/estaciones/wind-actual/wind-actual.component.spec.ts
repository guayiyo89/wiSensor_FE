import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindActualComponent } from './wind-actual.component';

describe('WindActualComponent', () => {
  let component: WindActualComponent;
  let fixture: ComponentFixture<WindActualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindActualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
