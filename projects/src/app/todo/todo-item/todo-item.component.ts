import {Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {IConfirm, ITodoItem} from '../interfaces/todo.interfaces';
import {FormsModule} from '@angular/forms';
import {DatePipe, LowerCasePipe} from '@angular/common';
import {HighlightPipe} from '../../shared/pipes/highlight.pipe';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../UI/dialogs/confirm-dialog/confirm-dialog.component';
import {ApiTodosService} from '../../shared/services/api-todos.service';

@Component({
  selector: 'app-todo-item',
  imports: [
    FormsModule,
    LowerCasePipe,
    DatePipe,
    HighlightPipe
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {

  private todosService: ApiTodosService = inject(ApiTodosService);

  @Input() task!: ITodoItem;

  @ViewChild('taskTitle') taskTitle!: ElementRef;

  readonly dialog = inject(MatDialog);

  private router: Router = inject(Router);

  public isShowButtons: boolean = false;
  public isComplete: boolean = false;
  public isEdit: boolean = false;




  public changeTask(task: ITodoItem): void {
    this.todosService.changeTask(task);
  }

  public deleteTask(task: ITodoItem): void {
    this.todosService.deleteTask(task);
  }


  public toggleButtons(): void {
    this.isShowButtons = !this.isShowButtons;
  }

  public editTask(): void {
    this.isEdit = !this.isEdit;
    this.isShowButtons = true;
    this.taskTitle.nativeElement.focus();
  }

  public  get editTextButton() {
    return this.isEdit ? 'Approve changes' : 'Edit';
  }

  public approveEdit() {
    this.isEdit = false;
    this.taskTitle.nativeElement.blur();

    this.changeTask(this.task);
  }

  public deleteItem(): void {
    this.deleteTask(this.task);
  }

  public completeItem(): void {

    this.isComplete = !this.isComplete;

    this.task.complete = this.isComplete;
    this.changeTask(this.task);
  }

  public checkedItem(): void {
    this.task.checked = !this.task.checked;
    this.changeTask(this.task);
  }

  public redirectToItem(): void {

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Вы хотите открыть задачу?'
      }
    }).afterClosed().subscribe((data: IConfirm) => {


      console.log(111, 'this.task.id', this.task.id);

      if (data.confirm) {
        this.router.navigate(['todo-item', this.task.id]);
      }
    })


  }
}
