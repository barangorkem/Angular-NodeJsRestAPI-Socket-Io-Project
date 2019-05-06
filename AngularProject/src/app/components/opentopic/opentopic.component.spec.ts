import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpentopicComponent } from './opentopic.component';

describe('OpentopicComponent', () => {
  let component: OpentopicComponent;
  let fixture: ComponentFixture<OpentopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpentopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpentopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
