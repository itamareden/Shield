import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopperComponent } from './stopper.component';

describe('StopperComponent', () => {
  let component: StopperComponent;
  let fixture: ComponentFixture<StopperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
