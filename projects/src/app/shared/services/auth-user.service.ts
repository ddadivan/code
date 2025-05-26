import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private router: Router = inject(Router);
  private localStorageService:LocalStorageService = inject(LocalStorageService);

  private isLoggedIn: boolean = false;

  constructor() { }

  get isLoggedUser(): boolean {
    return this.isLoggedIn;
  }

  get user() {
    return this.localStorageService.getItem('LoggedUser', 'null');
  }

  set isLoggedUser(value: boolean) {
    this.isLoggedIn = value;
  }

  public logout(): void {
    this.localStorageService.delete('LoggedUser');
  }

  public saveUser(data: any): void {
    this.isLoggedIn = true;
    this.localStorageService.setItem('LoggedUser', data);
    this.router.navigate(['/todo']);
  }

}
