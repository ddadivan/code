import {inject, Injectable} from '@angular/core';
import {ITodoItem} from '../../interfaces/todo.interfaces';
import {HttpClient} from '@angular/common/http';
import {sideEffectDecorator} from '../../../../utility/decorators/sideEffect';
import {withSideEffect} from '../../../../utility/withSideEffect';
import {LocalStorageService} from '../../../../shared/services/local-storage.service';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiTodosService{

  private http: HttpClient = inject(HttpClient);
  private localStorageService:LocalStorageService = inject(LocalStorageService);

  private tasks: ITodoItem[] = [];
  private tasksSubject$: BehaviorSubject<ITodoItem[]> = new BehaviorSubject<ITodoItem[]>([]);
  public readonly tasks$: Observable<ITodoItem[]> = this.tasksSubject$.asObservable();

  private isSortList: boolean = false;

  constructor() {
    this.init();
  }

  public init() {
    this.tasks = this.localStorageService.getItem('todoList', '[]');

    this.tasksSubject$.next(this.tasks);
  }

  public getItemById(id: number): ITodoItem {
    return <ITodoItem>this.tasks.find((task) => task.id === id);
  }

  public getTodo() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }

  public taskList(): ITodoItem[] {
    return this.tasks;
  }

  @sideEffectDecorator('saveListToStorage')
  public createTask(task: ITodoItem) {
    this.tasks.push(task);
  }

  @sideEffectDecorator('saveListToStorage')
  public changeTask(task: ITodoItem): void {
    const index = this.tasks.findIndex((item: ITodoItem): boolean => item.id === task.id);

    if (index !== -1) {
      this.tasks[index] = task;
    }
  }

  @sideEffectDecorator('saveListToStorage')
  public deleteSelected(): void {
    this.tasks = this.tasks.filter((item: ITodoItem) => !item.checked);
  }

  public get checkedItem() {
    return this.tasks.some((item: ITodoItem) => item.checked);
  }

  public get selectText(): string {
    return !this.checkedItem ? 'Select all' : 'Unselected all';
  }

  @sideEffectDecorator('saveListToStorage')
  public clearAll(): void {
    this.tasks = [];
  }

  private areAllStatusesSame(tasks: ITodoItem[]): boolean {
    const firstStatus = tasks[0].status;
    return tasks.every(task => task.status === firstStatus);
  }

  @sideEffectDecorator('saveListToStorage')
  public sortByPriority(): void {

    if (this.areAllStatusesSame(this.tasks)) {
      return;
    }

    if (this.isSortList) {
      this.tasks.reverse();
      return;
    }

    const order = { HIGH: 1, MIDDLE: 2, LOW: 3 };
    this.tasks = this.tasks.sort((a: ITodoItem, b: ITodoItem) => order[a.status] - order[b.status]);

    this.isSortList = true;
  }

  public sideEffectDeleteTask = withSideEffect(this.saveListToStorage.bind(this));
  public deleteTask = this.sideEffectDeleteTask((task: ITodoItem): void => {

    this.tasks = this.tasks.filter((item: ITodoItem) => item.id !== task.id);

    this.tasksSubject$.next(this.tasks); // need to delete
  })

  public sideEffectSelectAll = withSideEffect(this.saveListToStorage.bind(this));
  public selectAll = this.sideEffectSelectAll(() => {
    if (this.checkedItem) {
      this.tasks.forEach((item: ITodoItem) => item.checked = false);
      return;
    }

    this.tasks.forEach((item: ITodoItem) => item.checked = true);

    this.tasksSubject$.next(this.tasks); // need to delete
  })

  public saveListToStorage(): void {
    this.localStorageService.setItem('todoList', this.tasks);
    this.tasksSubject$.next(this.tasks);
  }
}
