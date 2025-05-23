import {Component, inject} from '@angular/core';
import {TodoListComponent} from './todo-list/todo-list.component';
import {FormsModule} from '@angular/forms';
import {IPriority, ITodoItem, priorityButtons} from './interfaces/todo.interfaces';
import {Status} from './enums/enums.todo';
import {CurrencyPipe, DatePipe, DecimalPipe} from '@angular/common';
import {CapitalizePipe} from '../shared/pipes/capitalize.pipe';
import {HighlightTextDirective} from '../shared/directives/highlight-text.directive';
import {MatDialog} from '@angular/material/dialog';
import {AuthDialogComponent} from '../UI/dialogs/auth-dialog/auth-dialog.component';
import {ApiTodosService} from '../shared/services/api-todos.service';

@Component({
  selector: 'app-todo',
  imports: [
    TodoListComponent,
    FormsModule,
    HighlightTextDirective,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

  private todosService: ApiTodosService = inject(ApiTodosService);

  public taskValue: string = '';
  public selectStatus: Status | null = null;
  public taskId: number = 1;

  public taskItem: ITodoItem | null = null;
  public priorityButtons: IPriority[] = priorityButtons;

  public addTask():void {
    this.taskItem = {
      id: this.taskId,
      title: this.taskValue,
      status: this.selectStatus ?? Status.LOW,
      checked: false,
      complete: false,
      date: new Date(),
    }

    this.todosService.createTask(this.taskItem);

    this.taskValue = '';
    this.taskId++;
  }

  public addPriority(status: Status): void {
    this.selectStatus = status;
  }




}
