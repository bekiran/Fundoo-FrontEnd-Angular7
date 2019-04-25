import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelseditComponent } from './labelsedit.component';

describe('LabelseditComponent', () => {
  let component: LabelseditComponent;
  let fixture: ComponentFixture<LabelseditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelseditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
