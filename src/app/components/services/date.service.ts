import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
constructor() { }

public date : BehaviorSubject<any> = new BehaviorSubject(moment());

changeMonth(month:number){
  const value = this.date.value.add(month, 'month');
  this.date.next(value);
}
changeDay(date: moment.Moment){
  const value = this.date.value.set({
    date: date.date(),
    month: date.month()
  })
  this.date.next(value);
}
}
