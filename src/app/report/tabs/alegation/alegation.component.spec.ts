import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlegationComponent } from './alegation.component';

describe('AlegationComponent', () => {
  let component: AlegationComponent;
  let fixture: ComponentFixture<AlegationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlegationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlegationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
