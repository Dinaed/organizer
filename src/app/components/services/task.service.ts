import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import { Task } from '../models/task';

interface CreateResponse {
  name:string
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public static url = 'https://angular-practic-organize-34686-default-rtdb.europe-west1.firebasedatabase.app/tasks';
  constructor(private httpClien: HttpClient) { }

  download(date: moment.Moment):Observable<Task[]>{
    return this.httpClien
    .get<Task[]>(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
    .pipe(map((res) => {
      if (!res) {
        return [];
      }
      return Object.keys(res).map((key) => ({...res[key], id: key}));
    }));
  }
  create(task:Task):Observable<Task>{
    return this.httpClien.post<CreateResponse>(`${TaskService.url}/${task.date}.json`, task).pipe(map((res) => {
      return {...task, id: res.name};
    }))
  }

  delete(task:Task):Observable<void>{
    return this.httpClien.delete<void>(`${TaskService.url}/${task.date}/${task.id}.json`);
  }
}