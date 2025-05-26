import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from "@angular/router";
import {ApiTodosService} from "../../shared/services/api-todos.service";

@Injectable({
  providedIn: 'root'
})
export class TodoResolverService implements Resolve<any>{

  private todosService: ApiTodosService = inject(ApiTodosService);

  public resolve(route: ActivatedRouteSnapshot) {
    return this.todosService.getItemById(Number(route.params['id']));
  }


}
