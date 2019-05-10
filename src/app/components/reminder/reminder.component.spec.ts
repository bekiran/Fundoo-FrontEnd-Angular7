import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDatepickerModule } from "@angular/material"

import { ReminderComponent } from './reminder.component';
import { FormsModule } from '@angular/forms';

describe('ReminderComponent', () => {
  let component: ReminderComponent;
  let fixture: ComponentFixture<ReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderComponent ],
      imports:[MatDatepickerModule,FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
