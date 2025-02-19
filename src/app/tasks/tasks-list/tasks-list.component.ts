import { Component, computed, inject, signal } from '@angular/core';
import { TASK_STATUS_OPTION, TaskStatusOptions } from '../task.model'; // Adjust the path as necessary

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers:[{
    provide: TASK_STATUS_OPTION,
    useValue:TaskStatusOptions
  }]
})
export class TasksListComponent {
  selectedFilter = signal<string>('all');

  private taskService = inject(TasksService);
  taskStatusOptions = inject(TASK_STATUS_OPTION);
  tasks = computed(()=>{
    switch(this.selectedFilter()){
      case 'all':
          return this.taskService.allTasks()
      case 'open':
           return this.taskService.allTasks().filter((task)=>task.status==='OPEN');
      case 'in-progress':
           return this.taskService.allTasks().filter((task)=>task.status==='IN_PROGRESS');
      case 'done':
        return this.taskService.allTasks().filter((task)=>task.status==='DONE');
      default:
        return this.taskService.allTasks();
     }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
