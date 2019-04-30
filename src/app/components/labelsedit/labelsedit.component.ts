import { Component, OnInit } from "@angular/core";
import { NoteServiceService } from "../../service/noteService/note-service.service";
import { from } from "rxjs";

@Component({
  selector: "app-labelsedit",
  templateUrl: "./labelsedit.component.html",
  styleUrls: ["./labelsedit.component.scss"]
})
export class LabelseditComponent implements OnInit {
  labelsList: any;
  flag = true;
  flags = true;
  label: string;
  model: any;
  constructor(private noteService: NoteServiceService) {}

  ngOnInit() {
    this.getLabels();
  }
  reverseFlag() {
    this.flag = !this.flag;
  }
  reverse() {
    this.flags = !this.flags;
  }

  /******* To get all labels  *********/

  getLabels() {
    try {
      var userid = localStorage.getItem("userid");
      this.noteService.getLableList().subscribe(data => {
        console.log("labels in labels edit comp==>", data);

        this.labelsList = data["data"];
        this.labelsList = this.labelsList.reverse();
      });
    } catch (error) {
      console.log("error at getting labels");
    }
  }

  /******* To add labels  *********/

  addLabel(label) {
    try {
      var userid = localStorage.getItem("userid");
      this.noteService
        .postLabel({
          label: label,
          userId: userid
        })
        .subscribe(data => {
          console.log("skjhg", data);

          this.labelsList.splice(0, 0, data["data"]);
          this.label = "";
        });
    } catch (error) {
      console.log("Error at adding label");
    }
  }

  deleteLabel(array) {
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

  updateLabel(array) {
    try {
      this.model = {
        labelID: array._id,
        editLabel: array.label
      };
      this.noteService.updateLabel(this.model).subscribe(data => {
        this.getLabels();
      });
    } catch (error) {
      console.log("error at updatelabel");
    }
  }
}
