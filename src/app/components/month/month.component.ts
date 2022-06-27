import { Component } from '@angular/core';
import { DateService } from 'src/app/components/services/date.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent {

  constructor(public dateService:DateService) { }

  go(month:number){
    this.dateService.changeMonth(month);
  }
}
