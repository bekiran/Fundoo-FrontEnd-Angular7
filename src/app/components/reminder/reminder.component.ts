import { Component, OnInit } from '@angular/core';
import {NoteServiceService} from '../../../app/service/noteService/note-service.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  dayCount=0;
  reminderShow : boolean = true;
  changed : boolean;
  todaydate: Date = new Date();
  checker : Date = new Date();

  remindList = [
    { day: 'today', time: '8:00 PM', dayCount:0, timeCount: 20},
    { day: 'tomorrow', time: '8:00 AM', dayCount:1, timeCount: 8},
    { day: 'Next week', time: '8:00 AM', dayCount:7, timeCount: 8}
  ]
  customList = [
    { value: 'option1', timeZone: 'Morning', time: '8:00 AM', timeCount: 8},
    { value: 'option2', timeZone: 'Afternoon', time: '1:00 PM', timeCount:13},
    { value: 'option3', timeZone: 'Evening', time: '6:00 PM', timeCount:18},
    { value: 'option4', timeZone: 'Night', time: '8:00 PM', timeCount:20}
  ]

  constructor(private notes : NoteServiceService) { }

  ngOnInit() {
  }
  toggle(){
    this.reminderShow = !this.reminderShow;
  }

}
