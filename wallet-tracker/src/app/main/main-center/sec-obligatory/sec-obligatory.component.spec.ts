import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecObligatoryComponent } from './sec-obligatory.component';

describe('SecObligatoryComponent', () => {
  let component: SecObligatoryComponent;
  let fixture: ComponentFixture<SecObligatoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecObligatoryComponent]
    });
    fixture = TestBed.createComponent(SecObligatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
