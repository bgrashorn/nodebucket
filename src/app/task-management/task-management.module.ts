/**
 * Title: task-management.module.ts
 * Author: Professor Krasso and Brett Grashorn
 * Date: 8/17/23
 */


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagementRoutingModule } from './task-management-routing.module';
import { TaskManagementComponent } from './task-management.component';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    TaskManagementComponent,
    TasksComponent
  ],
  imports: [
    CommonModule,
    TaskManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    DragDropModule
  ]
})
export class TaskManagementModule { }
