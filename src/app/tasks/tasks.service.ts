import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Task[]=[]
  

  addTask(taskData:{title: string;description:string}){

    console.log("before",this.tasks)

    const newTask :Task=
      {
        id: Math.floor((Math.random())*100).toString(),
        title: taskData.title,
        description: taskData.description,
        status: 'OPEN'
      }

    
    this.tasks.push(newTask)

    console.log("after",this.tasks)
  }

  constructor() { }
}
