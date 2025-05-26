import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {inject, Injectable} from '@angular/core';
import {AuthDialogComponent} from '../../UI/dialogs/auth-dialog/auth-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {LocalStorageService} from '../../shared/services/local-storage.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  readonly dialog = inject(MatDialog);
  private router: Router = inject(Router);
  private localStorageService:LocalStorageService = inject(LocalStorageService);

  public canActivate(): boolean {

    if (!this.localStorageService.getItem('LoggedUser', 'false')) {
      this.router.navigate(['/auth']);
      return false;
    }

    return true;
  }
}
