import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsComponent } from './collaborators.component';
import {MatDividerModule, MatTooltipModule, MatDialog}from '@angular/material'; 
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { AppMaterial } from "../../app.material.module";
import { HttpClientModule } from '@angular/common/http';
describe('CollaboratorsComponent', () => {
  let component: CollaboratorsComponent;
  let fixture: ComponentFixture<CollaboratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorsComponent ],
      imports:[MatDividerModule,MatTooltipModule,AppMaterial,HttpClientModule,MatDialogModule,MatDialog, MatDialogRef ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
