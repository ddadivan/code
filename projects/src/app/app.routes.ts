import { Routes } from '@angular/router';
import {TodoComponent} from './todo/todo.component';
import {TodoInfoComponent} from './todo/todo-info/todo-info.component';
import {IntroComponent} from './intro/intro.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {Test3Component} from './UI/test-3/test-3.component';
import {Test1Component} from './UI/test-1/test-1.component';
import {Test2Component} from './UI/test-2/test-2.component';

export const routes: Routes = [
  //{path: '', component: Test1Component, pathMatch: 'prefix', children:[{path:'home', component: Test2Component}]},
  {path: '', component: IntroComponent},
  {path: 'todo', component: TodoComponent, canActivate: [AuthGuard]},
  {path: 'todo-item/:id', component: TodoInfoComponent},
  {path: 'home', component: Test3Component, pathMatch:'full', children: [
      {path: '', component: Test1Component},
      {path: 'send', component: Test2Component},
    ] },
];
