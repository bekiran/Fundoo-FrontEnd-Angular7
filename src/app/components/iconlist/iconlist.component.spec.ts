import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconlistComponent } from './iconlist.component';

describe('IconlistComponent', () => {
  let component: IconlistComponent;
  let fixture: ComponentFixture<IconlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
