import { Component, OnInit} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DateService } from 'src/app/components/services/date.service';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { switchMap } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  form!: UntypedFormGroup;
  tasks:Task[]= [];
  
    
  constructor(public dateService:DateService, private taskServise:TaskService) { }

  ngOnInit() {
    this.dateService.date.pipe(
      switchMap((value) => this.taskServise.download(value))).subscribe((tasks) => {
        this.tasks = tasks
      })

    this.form = new UntypedFormGroup({
      title: new UntypedFormControl('', Validators.required)
    })
  }
  submit() {
    const {title} = this.form.value;
    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
    }
    this.taskServise.create(task).subscribe(task =>{
      this.tasks.push(task);
      this.form.reset()
    }, err => console.error(err));
  }
  removeTask(task: Task){
    this.taskServise.delete(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    }, err => console.error(err))
  }
  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
}
