import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarIncidenciaComponent } from './mostrar-incidencia.component';

describe('MostrarIncidenciaComponent', () => {
  let component: MostrarIncidenciaComponent;
  let fixture: ComponentFixture<MostrarIncidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarIncidenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
