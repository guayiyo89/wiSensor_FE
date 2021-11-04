import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditincidenteComponent } from './editincidente.component';

describe('EditincidenteComponent', () => {
  let component: EditincidenteComponent;
  let fixture: ComponentFixture<EditincidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditincidenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditincidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
