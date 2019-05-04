import { Component, OnInit } from '@angular/core';
import { NoteServiceService} from '../../service/noteService/note-service.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss']
})
export class CollaboratorsComponent implements OnInit {

  email:any;
  username:string
  image:any
  img = localStorage.getItem('image')
  flag = true

  constructor( private noteService: NoteServiceService) { 
    this.email = localStorage.getItem('email');
    this.username = localStorage.getItem('name');
    // this.image = localStorage.getItem('image')
  }

  ngOnInit() {
  }


  saveCollaborators(name){
    try {
      this.noteService.saveCollaboratorsToNote({
        name: name
      }).subscribe(co=>{

      })
    } catch (error) {
      console.log("Error in adding name(user) to note");
      
    }
  }

  removeCollaborators(){
    // try {
      
    // } catch (error) {
    //   console.log("error on removing collaborator");
      
    // }
  }

}
