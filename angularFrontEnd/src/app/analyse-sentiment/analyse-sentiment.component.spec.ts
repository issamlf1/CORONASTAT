import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseSentimentComponent } from './analyse-sentiment.component';

describe('AnalyseSentimentComponent', () => {
  let component: AnalyseSentimentComponent;
  let fixture: ComponentFixture<AnalyseSentimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyseSentimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseSentimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
