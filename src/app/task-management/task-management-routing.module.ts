/**
 * Title: task-management-routing.module.ts
 * Author: Professor Krasso and Brett Grashorn
 * Date: 8/17/23
 */


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskManagementComponent } from './task-management.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {
    path: '',
    component: TaskManagementComponent,
    children: [
      {
        path: 'my-tasks',
        component: TasksComponent,
        title: 'Nodebucket: My Tasks',
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskManagementRoutingModule { }
