import {Component, inject, Input, OnInit} from '@angular/core';
import { ITodoItem} from '../interfaces/todo.interfaces';
import {TodoItemComponent} from '../todo-item/todo-item.component';
import {withSideEffect} from '../../utility/withSideEffect';
import {sideEffectDecorator} from '../../utility/decorators/sideEffect';
import {InfoPanelComponent} from '../info-panel/info-panel.component';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ApiTodosService} from '../../shared/services/api-todos.service';

@Component({
  selector: 'app-todo-list',
  imports: [
    TodoItemComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit{

  private todosService: ApiTodosService = inject(ApiTodosService);


  public listTask: ITodoItem[] = [];



  ngOnInit() {
    this.listTask = this.todosService.taskList();
  }

  public selectAll(): void {
    this.todosService.selectAll();
  }

  public get checkedItem(): boolean {
    return this.todosService.checkedItem;
  }

  public get selectText(): string {
    return this.todosService.selectText
  }

  public clearAll(): void {
    this.todosService.clearAll();
  }

  public deleteSelected(): void {
    this.todosService.deleteSelected();
  }

  public sortByPriority(): void {
    this.todosService.sortByPriority();
  }



}
