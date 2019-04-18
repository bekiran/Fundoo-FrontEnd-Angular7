import { Component, OnInit } from '@angular/core';
import { NoteServiceService} from '../../service/noteService/note-service.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  layout;
  view;
  wrap:string="wrap";
  direction


  constructor( public noteService : NoteServiceService) { }

  ngOnInit() {
    this.noteService.getView().subscribe((res:any)=>{
      // debugger
      console.log(res);
      
        this.view = res;
        this.direction = this.view.data;
        this.layout = this.direction + " " + this.wrap;
  });
}

}
