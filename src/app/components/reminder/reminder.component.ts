import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NoteServiceService } from "../../../app/service/noteService/note-service.service";
import { from } from "rxjs";
@Component({
  selector: "app-reminder",
  templateUrl: "./reminder.component.html",
  styleUrls: ["./reminder.component.scss"]
})
export class ReminderComponent implements OnInit {
  @Input() card;
  @Output() emitReminderNote = new EventEmitter();

  dayCount = 0;
  reminderShow: boolean = true;
  changed = true;
  todaydate: Date = new Date();
  checker: Date = new Date();
  currentDate = new Date();
  model;

  remindList = [
    { day: "today", time: "8:00 PM", dayCount: 0, timeCount: 20 },
    { day: "tomorrow", time: "8:00 AM", dayCount: 1, timeCount: 8 },
    { day: "Next week", time: "8:00 AM", dayCount: 7, timeCount: 8 }
  ];
  customList = [
    { value: "option1", timeZone: "Morning", time: "8:00 AM", timeCount: 8 },
    { value: "option2", timeZone: "Afternoon", time: "1:00 PM", timeCount: 13 },
    { value: "option3", timeZone: "Evening", time: "6:00 PM", timeCount: 18 },
    { value: "option4", timeZone: "Night", time: "8:00 PM", timeCount: 20 }
  ];

  constructor(private notes: NoteServiceService) {}

  ngOnInit() {}
  toggle() {
    this.reminderShow = !this.reminderShow;
  }
  reminder(dayCount, timeCount) {
    console.log(dayCount, timeCount, "==>daycount,timeCount");
    this.changed = true;
    this.model = {
      noteID: [this.card._id],
      reminder: new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        this.currentDate.getDate() + dayCount,
        timeCount,
        0,
        0,
        0
      )
    };
    console.log(this.model, "model....");
    if (this.card._id == undefined) {
      this.card.reminder = this.model.reminder;
    } else {
      this.saveReminder();
    }
  }

  customreminder(timeCount) {
    console.log("time ", timeCount);

    this.changed = true;
    this.checker.setHours(timeCount, 0, 0);
    this.model = {
      noteID: [this.card._id],
      reminder: this.checker
    };
  }

  saveReminder() {
    console.log(
      "save reminder run",
      this.changed,
      "    ",
      this.card._id,
      "      "
    );

    if (this.changed) {
      // console.log(this.model.reminder, "model");
      if (this.card._id == undefined) {
        this.card.reminder = this.model.reminder;
      } else {
        console.log("api call", this.model);

        this.notes.addRemainder(this.model).subscribe(response => {
          console.log(response, "response");
          this.card.reminder = this.model.reminder;
        });
      }
    }
  }
}
