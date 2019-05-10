import { Component, OnInit, Inject, Input } from '@angular/core';
import { NoteServiceService } from '../../service/noteService/note-service.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { from } from 'rxjs';
import { DialogData } from '../iconlist/iconlist.component'

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss']
})
export class CollaboratorsComponent implements OnInit {


  email: any;
  username: string
  image: any

  img = localStorage.getItem('image')
  flag = true
  collabList: any;
  card: any

  constructor(private noteService: NoteServiceService, public dialogRef: MatDialogRef<CollaboratorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log("jdhsigh", this.card = data['card']);

    this.email = localStorage.getItem('email');
    this.username = localStorage.getItem('name');
    // this.image = localStorage.getItem('image')


  }

  ngOnInit() {
    this.getCollab()
  }


  saveCollaborators(collabUserID) {
    try {
      if (this.card != undefined) {
        console.log("hjasdgh==>", this.card);
        this.noteService.saveCollaboratorsToNote({
          userID: localStorage.getItem('userid'),
          noteID: this.card._id,
          collabUserID: collabUserID
        }).subscribe(data => {
          console.log("data in collab=>", data);
          this.collabList = data["data"];
          this.collabList = this.collabList.reverse()
          this.collabList.splice(0, 0, data["data"]);
          this.card = "";
        })
      }
    } catch (error) {
      console.log("Error in adding name(user) to note");
    }
  }


  getCollab() {
    var userid = localStorage.getItem("userid");
    this.noteService.getCollaborators().subscribe(data => {
      console.log("get Collab ===>", data);
      this.collabList = data["data"]
      this.collabList = this.collabList.reverse();
    })
  }

  removeCollaborators(item,card){
    this.noteService.removeCollab({
      collabUserID:item,
      noteID:card._id
    }) .subscribe(data=>{
      console.log(data);
      let ind = this.card.collab.indexOf(item);
      this.card.collab.splice(ind, 1)
    })

  }
  /**
   *   deleteLabel(array) {
    try {
      console.log("hasgbjh", array._id);
      this.noteService
        .deleteLabel({
          labelID: array._id
        })
        .subscribe(data => {
          console.log("when deleted ===>");

          let ind = this.labelsList.indexOf(array);
          this.labelsList.splice(ind, 1);
        });
    } catch (error) {
      console.log("error at label delete");
    }
  }
   */

  


}
