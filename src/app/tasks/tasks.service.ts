import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

// @Injectable({
//   providedIn: 'root',
// })
export class TasksService {
  tasks = signal<Task[]>([]);
  private loggingService = inject(LoggingService);

  allTasks= this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      id: Math.floor(Math.random() * 100).toString(),
      title: taskData.title,
      description: taskData.description,
      status: 'OPEN',
    };
    
    
    this.tasks.update((oldTask) => [...oldTask, newTask]);
    console.log(this.tasks())
    this.loggingService.log('ADDED TASK WITH TITLE'+ taskData.title)
  }

  updateTaskStatus(taskId:String,newStatus:TaskStatus){
     this.tasks.update(tasks=>
      tasks.map(task=>
         task.id === taskId?{...task,status:newStatus}:task
      ));
      this.loggingService.log('CHANGE TASK STATUS'+ newStatus);

    }
      
}
