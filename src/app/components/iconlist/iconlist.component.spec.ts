import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconlistComponent } from './iconlist.component';
import { MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from "@angular/material";



describe('IconlistComponent', () => {
  let component: IconlistComponent;
  let fixture: ComponentFixture<IconlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconlistComponent ],
      imports:[MatMenuModule,MatIconModule]
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
