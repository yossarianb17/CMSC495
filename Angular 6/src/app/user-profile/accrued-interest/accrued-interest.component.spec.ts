import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccruedInterestComponent } from './accrued-interest.component';

describe('AccruedInterestComponent', () => {
  let component: AccruedInterestComponent;
  let fixture: ComponentFixture<AccruedInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccruedInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccruedInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
