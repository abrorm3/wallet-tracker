import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecAdminComponent } from './sec-admin.component';

describe('SecAdminComponent', () => {
  let component: SecAdminComponent;
  let fixture: ComponentFixture<SecAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecAdminComponent]
    });
    fixture = TestBed.createComponent(SecAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
