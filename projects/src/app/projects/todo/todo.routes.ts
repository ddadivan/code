import { Routes } from '@angular/router';
import {TodoComponent} from "./todo.component";
import {TodoInfoComponent} from "./todo-info/todo-info.component";
import {TodoResolverService} from "./shared/services/todo-resolver.service";

export const routes: Routes = [
  {path: '', component: TodoComponent},
  {path: 'todo-item/:id', component: TodoInfoComponent, resolve: {todo: TodoResolverService}},
];
