import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  CanDeactivateFn,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from "@angular/core";

// export const confirmDeactivateGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
//   return true;
// };

@Injectable({
  providedIn: 'root'
})
export class ConfirmDeactivateGuard implements CanDeactivate<unknown> {


  public canDeactivate(component: any) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
