import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiTodosService} from '../../shared/services/api-todos.service';
import {ITodoItem} from '../interfaces/todo.interfaces';
import {DatePipe, LowerCasePipe} from '@angular/common';
import {HighlightPipe} from '../../shared/pipes/highlight.pipe';

@Component({
  selector: 'app-todo-info',
  imports: [
    LowerCasePipe,
    DatePipe,
    HighlightPipe
  ],
  templateUrl: './todo-info.component.html',
  styleUrl: './todo-info.component.scss'
})
export class TodoInfoComponent  implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);
  private todosService: ApiTodosService = inject(ApiTodosService);
  private router = inject(Router);

  public task!: ITodoItem;
  public taskId: number = 0;


  ngOnInit() {
    this.init();
  }

  public init() {
    console.log('1', this.taskId);
    this.route.params.subscribe((params) => {
      if (params.hasOwnProperty('id')) {
        this.taskId = params['id'];
        console.log('2', this.taskId);
      }
    })
    console.log('3', this.taskId);
    this.task = this.todosService.getItemById(this.taskId);

    console.log(111, this.task);
  }

  public todosHttp() {
    this.todosService.getTodo().subscribe((data) => {
      console.log('1data', data);
    })

    console.log('2data', 'sdfsdf');
  }

  public backToList(): void {

    this.router.navigate(['/todo']);
  }

}
