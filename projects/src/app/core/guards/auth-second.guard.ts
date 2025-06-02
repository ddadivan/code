import {CanMatch, CanMatchFn, GuardResult, MaybeAsync, Route, Router, UrlSegment} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {AuthUserService} from "../../shared/services/auth-user.service";

// export const authSecondGuard: CanMatchFn = (route, segments) => {
//   return true;
// };
@Injectable({
  providedIn: 'root'
})
export class AuthSecondGuard implements CanMatch {

  private authUserService: AuthUserService = inject(AuthUserService);
  private router: Router = inject(Router);


  public canMatch(route: Route, segments: UrlSegment[]): boolean {

    console.log(111, 'route', route);
    console.log(111, 'segments', segments);

    return true;

    if (this.authUserService.user) {
      return true;
    }

    this.router.navigate(['/auth']);
    return false;

  }

}
