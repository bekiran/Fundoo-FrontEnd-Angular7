import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject} from 'rxjs'

// Subjects are used for multicasting Observables. This means that Subjects will make sure 
// each subscription gets the exact same value as the Observable execution is 
// shared among the subscribers.

// BehaviorSubject is one of the type of subject : The BehaviorSubject has the characteristic 
// that it stores the “current” value. This means that you can always directly get the last 
// emitted value from the BehaviorSubject.

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  private messageSource = new BehaviorSubject(''); 
  currentMessage = this.messageSource.asObservable();

  constructor() { }


  changeMessage(message: string){
    this.messageSource.next(message)
  }
  
}
