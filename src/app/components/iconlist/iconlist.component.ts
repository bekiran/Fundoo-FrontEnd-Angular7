import { Component, OnInit, Output, Input } from "@angular/core";
import { NoteServiceService } from "../../service/noteService/note-service.service";
import { EventEmitter } from "@angular/core";
import { MatSnackBar, MatDialog } from "@angular/material";
import { LabelseditComponent } from "../labelsedit/labelsedit.component";
import { from } from "rxjs";
import { CollaboratorsComponent } from "../collaborators/collaborators.component";
export interface DialogData {
  card:any
}

@Component({
  selector: "app-iconlist",
  templateUrl: "./iconlist.component.html",
  styleUrls: ["./iconlist.component.scss"]
})
export class IconlistComponent implements OnInit {
  @Input() card: any;
  @Input() more;
  @Output() color = new EventEmitter();
  @Input() type;
  @Input() doarchive: boolean;
  @Output() deletecard = new EventEmitter();
  @Output() archivedCard = new EventEmitter();
  @Output() unarchiveCard = new EventEmitter();
  @Output() emitReminderNote = new EventEmitter();
  @Output() archivedNoteCard = new EventEmitter();
  @Output() emitLabelToNote = new EventEmitter();

  model: any;
  flag = false;
  flag2 = true;
  flag1 = true;
  flag3 = true;
  flag4 = true;
  display = false;
  allcards: any;
  labelsList: any;
  label: string;

  /***************************************************************
   * List of colors that can be applied to card taken in an array
   **************************************************************/
  colorArray = [
    [
      { color: "#fff", name: "White" },
      { color: "#f28b82", name: "Red" },
      { color: "#fbbc04", name: "Orange" },
      { color: "#fff475", name: "Yellow" }
    ],

    [
      { color: "#ccff90", name: "Green" },
      { color: "#a7ffeb", name: "Teal" },
      { color: "#cbf0f8", name: "Blue" },
      { color: "#aecbfa", name: "Darkblue" }
    ],

    [
      { color: "#d7aefb", name: "Purple" },
      { color: "#fdcfe8", name: "Pink" },
      { color: "#e6c9a8", name: "Brown" },
      { color: "#e8eaed", name: "Gray" }
    ]
  ];

  constructor(
    private notes: NoteServiceService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getLabels();
  }

  colorsEdit(color, card) {
    console.log(card, "cardd..............");
    console.log(color, "color........");
    if (card == undefined) {
      this.color.emit(color);
    } else {
      card.color = color;
      this.updateColor(color, card);
    }
  }

  updateColor(color, card) {
    console.log(card, "card..");
    console.log((card.color = color), "color..");
    this.notes
      .updateColor({
        color: color,
        noteID: [card._id]
      })
      .subscribe(
        data => {
          console.log(data, "update color data");
        },
        err => {
          console.log(err, "err");
        }
      );
  }

  // to move notes from note to archive
  doArchive(card) {
    if (card == undefined) {
      this.archivedNoteCard.emit(true);
    } else {
      console.log(this.card, "cardddd");
      console.log(card._id, "cardidddddddddd");
      this.notes
        .archiveNote({
          archive: true,
          noteID: [card._id]
        })
        .subscribe(data => {
          console.log(data, "dataaaaaaaaaaaaaaaaaaaaa");
          this.cardArchive(card);
        }),
        err => console.log(err);
    }
  }

  cardArchive(card) {
    card.archive = true;
    this.archivedCard.emit(card);
  }

  doUnArchive(card) {
    this.notes
      .archiveNote({
        archive: false,
        noteID: [card._id]
      })
      .subscribe(data => {
        this.notArchive(card);
      }),
      err => console.log(err);
  }
  notArchive(card) {
    card.archive = false;
    this.unarchiveCard.emit(card);
  }

  deleteNote(card) {
    this.notes
      .deleteNote({
        trash: true,
        noteID: [card._id]
      })
      .subscribe(
        data => {
          console.log(data, "response ==> delete is clicked");
          this.cardDelete(card);
        },
        err => console.log(err)
      );
  }
  cardDelete(card) {
    card.trash = true;
    this.deletecard.emit(card);
  }

  // openLabel(){
  //   {
  //     try {
  //       const dialogRef = this.dialog.open(LabelseditComponent, {
  //         width:'auto',
  //         data:{}

  //       })

  //     } catch (error) {
  //       console.log("error occured");
  //     }
  //   }
  // }

  reverseFlag() {
    this.flag2 = !this.flag2;
  }

  openSnackBar1() {
    this.snackBar.open("Note archived", "Ok", { duration: 2000 });
  }
  openSnackBar2() {
    this.snackBar.open("Note unarchived", "Ok", { duration: 2000 });
  }
  openSnackBar3() {
    this.snackBar.open("Note trashed", "Ok", { duration: 2000 });
  }

  getLabels() {
    try {
      var userid = localStorage.getItem("userid");
      this.notes.getLableList().subscribe(data => {
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
      this.notes
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

  doSomething($event: any) {
    this.flag3 = !this.flag3;
    $event.stopPropagation();
    //Another instructions
  }

  saveLabeltoNote(card, label) {
    if (card != undefined) {
      this.notes
        .saveLabelToNote({
          noteID: card._id,
          label: label.label,
          pull: false
        })
        .subscribe(data => {
          card["label"].push(label.label);
          console.log("dkjsf==>", card);

          console.log("data in save labels", data);
        });
      }
    // } else {
    //   this.emitLabelToNote.emit(label);
    // }
  }

  openCollaborators(card) {
    console.log(card);
    
    {
      try {

        const dialogRef = this.dialog.open(CollaboratorsComponent, {
          width: "500px",
          data: {card}
        });
      } catch (error) {
        console.log("error occured");
      }
    }
  }
}
