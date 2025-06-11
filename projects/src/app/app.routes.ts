import { Routes } from '@angular/router';
import {TodoComponent} from './projects/todo/todo.component';
import {TodoInfoComponent} from './projects/todo/todo-info/todo-info.component';
import {IntroComponent} from './intro/intro.component';
import {AuthGuard} from './core/guards/auth.guard';
import {Test3Component} from './UI/test-3/test-3.component';
import {Test1Component} from './UI/test-1/test-1.component';
import {Test2Component} from './UI/test-2/test-2.component';
import {AuthDialogComponent} from "./UI/dialogs/auth-dialog/auth-dialog.component";
import {ConfirmDeactivateGuard} from "./core/guards/confirm-deactivate.guard";
import {TodoResolverService} from "./projects/todo/shared/services/todo-resolver.service";
import {AuthSecondGuard} from "./core/guards/auth-second.guard";
import {TabletEmployeesComponent} from "./projects/company/components/tablet-employees/tablet-employees.component";
import {MainCompanyComponent} from "./projects/company/components/main-company/main-company.component";
import {ProfileComponent} from "./projects/company/components/profile/profile.component";

export const routes: Routes = [
  //{path: '', component: Test1Component, pathMatch: 'prefix', children:[{path:'home', component: Test2Component}]},
  {path: '', component: IntroComponent},
  {path: 'auth', component: AuthDialogComponent, canDeactivate: [ConfirmDeactivateGuard]},
  {path: 'todo', loadChildren: () => import('./projects/todo/todo.routes').then((m) => m.routes), canActivate: [AuthGuard], canMatch: [AuthSecondGuard]},
  {path: 'home', component: Test3Component, pathMatch:'full', children: [
      {path: '', component: Test1Component},
      {path: 'send', component: Test2Component},
    ] },

  {path: 'company', component: MainCompanyComponent,
      children: [
        {path: '', component: TabletEmployeesComponent},
        {path: 'employee/:id', component: ProfileComponent},
      ]
  },

];
