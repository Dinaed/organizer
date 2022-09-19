import { Task } from '../models/task';
import { TaskService } from './../services/task.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DateService } from 'src/app/components/services/date.service';
import { Week } from '../models/week';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendar:Week[] = [];
  tasks:Task[]=[];
  busy:boolean = false;
  constructor( private dateService:DateService, private taskService:TaskService) { }

  ngOnInit() {
    this.dateService.date.subscribe(this.generate.bind(this));
  }

  
  generate(now: moment.Moment){
    const startDate = now.clone().startOf('month').startOf('week');
    const endDate = now.clone().endOf('month').endOf('week');
    const date = startDate.clone().subtract(1, 'day');
    const calendar = [];

    while(date.isBefore(endDate, 'day')) {
      calendar.push({
        days: Array(7).fill(1).map(() => {
          const value = date.add(1, 'day').clone();
          const active = moment().isSame(value, 'date');
          const disabled = !now.isSame(value, 'month');
          const selected = now.isSame(value, 'date');
          return {
            value, active, disabled, selected
          }
        })
      })      
    }
    this.calendar = calendar;
    
  }
  select(day:moment.Moment){
    this.dateService.changeDay(day);
  }
}
