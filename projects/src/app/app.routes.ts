import { Routes } from '@angular/router';
import {TodoComponent} from './todo/todo.component';
import {TodoInfoComponent} from './todo/todo-info/todo-info.component';
import {IntroComponent} from './intro/intro.component';
import {AuthGuard} from './core/guards/auth.guard';
import {Test3Component} from './UI/test-3/test-3.component';
import {Test1Component} from './UI/test-1/test-1.component';
import {Test2Component} from './UI/test-2/test-2.component';
import {AuthDialogComponent} from "./UI/dialogs/auth-dialog/auth-dialog.component";
import {ConfirmDeactivateGuard} from "./core/guards/confirm-deactivate.guard";
import {TodoResolverService} from "./todo/services/todo-resolver.service";

export const routes: Routes = [
  //{path: '', component: Test1Component, pathMatch: 'prefix', children:[{path:'home', component: Test2Component}]},
  {path: '', component: IntroComponent},
  {path: 'auth', component: AuthDialogComponent, canDeactivate: [ConfirmDeactivateGuard]},
  {path: 'todo', loadChildren: () => import('./todo/todo.routes').then((m) => m.routes), canActivate: [AuthGuard]},

    {path: 'home', component: Test3Component, pathMatch:'full', children: [
      {path: '', component: Test1Component},
      {path: 'send', component: Test2Component},
    ] },
];
