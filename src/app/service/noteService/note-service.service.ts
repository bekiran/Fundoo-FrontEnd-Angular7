import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { from } from "rxjs";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class NoteServiceService {
  constructor(private http: HttpService) { }
  result: boolean = true;
  subject = new Subject();

  getNote() {
    return this.http.getHttp("getNotes");
  }
  archiveNote(data) {
    return this.http.put('isArchived', data)
  }
  deleteNote(data) {
    return this.http.put('isTrashed', data)
  }
  deleteForever(data) {
    return this.http.postJSON('deleteNote', data)
  }
  updateColor(data) {
    return this.http.put('updateColor', data)
  }
  addRemainder(data) {
    return this.http.put('reminder', data)
  }
  doPin(data) {
    return this.http.put('isPinned', data)
  }


  getView() {
    this.gridview();
    return this.subject.asObservable();
  }
  gridview() {
    console.log('grid view result ', this.result);

    if (this.result) {
      this.subject.next({ data: "row" });
      this.result = false;
    }
    else {
      this.subject.next({ data: "column" });
      this.result = true;
    }
  }

  removeRemainder(data) {
    return this.http.put('reminder', data)
  }
  updatenote(data) {
    return this.http.put('editTitle', data)

  }
  updatedescription(data) {
    return this.http.put('editDescription', data)
  }
  getLableList() {
    return this.http.getHttpLabel('getLabels')
  }
  postLabel(data) {
    return this.http.postJSON('addLabel', data)

  }
  deleteLabel(data) {
    return this.http.postJSONLabel('deleteLabel', data)
  }
  updateLabel(data) {
    return this.http.put('updateLabel', data)
  }

  saveLabelToNote(body) {
    return this.http.postJSON('saveLabelToNote', body)
  }
 saveCollaboratorsToNote(body){
   return this.http.postJSON('saveCollaborator', body)
 }

//  getNotesOfLabel(label){
//   return this.http.postJSON('getNotes'+label,"")
// }
}
