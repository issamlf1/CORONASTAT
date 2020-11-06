import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrapheVisualisationComponent } from './graphe-visualisation.component';

describe('GrapheVisualisationComponent', () => {
  let component: GrapheVisualisationComponent;
  let fixture: ComponentFixture<GrapheVisualisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrapheVisualisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrapheVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
