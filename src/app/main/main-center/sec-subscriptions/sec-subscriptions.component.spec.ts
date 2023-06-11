import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecSubscriptionsComponent } from './sec-subscriptions.component';

describe('SecSubscriptionsComponent', () => {
  let component: SecSubscriptionsComponent;
  let fixture: ComponentFixture<SecSubscriptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecSubscriptionsComponent]
    });
    fixture = TestBed.createComponent(SecSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
