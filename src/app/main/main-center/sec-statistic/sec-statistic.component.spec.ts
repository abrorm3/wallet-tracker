import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecStatisticComponent } from './sec-statistic.component';

describe('SecStatisticComponent', () => {
  let component: SecStatisticComponent;
  let fixture: ComponentFixture<SecStatisticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecStatisticComponent]
    });
    fixture = TestBed.createComponent(SecStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
