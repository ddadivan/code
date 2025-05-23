import {CanActivate, CanActivateFn} from '@angular/router';
import {inject, Injectable} from '@angular/core';
import {AuthDialogComponent} from '../../UI/dialogs/auth-dialog/auth-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {LocalStorageService} from '../services/local-storage.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  readonly dialog = inject(MatDialog);
  private localStorageService:LocalStorageService = inject(LocalStorageService);

  public canActivate(): boolean {

    if (!JSON.parse(this.localStorageService.get('isLoggedUser') ?? 'false')) {
      this.dialog.open(AuthDialogComponent);
      return false;
    }

    return true;
  }
}
