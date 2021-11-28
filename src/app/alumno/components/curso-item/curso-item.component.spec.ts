import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoItemComponent } from './curso-item.component';

describe('CursoItemComponent', () => {
  let component: CursoItemComponent;
  let fixture: ComponentFixture<CursoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
