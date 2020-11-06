import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilCompoComponent } from './acceuil-compo.component';

describe('AcceuilCompoComponent', () => {
  let component: AcceuilCompoComponent;
  let fixture: ComponentFixture<AcceuilCompoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceuilCompoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceuilCompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
