import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopperRecordsComponent } from './stopper-records.component';

describe('StopperRecordsComponent', () => {
  let component: StopperRecordsComponent;
  let fixture: ComponentFixture<StopperRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopperRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopperRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
