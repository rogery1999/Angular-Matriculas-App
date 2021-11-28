import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasCursosComponent } from './notas-cursos.component';

describe('NotasCursosComponent', () => {
  let component: NotasCursosComponent;
  let fixture: ComponentFixture<NotasCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotasCursosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
