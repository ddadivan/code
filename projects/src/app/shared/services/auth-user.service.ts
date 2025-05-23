import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private router: Router = inject(Router);
  private isLoggedIn: boolean = false;

  constructor() { }

  get isLoggedUser(): boolean {
    return this.isLoggedIn;
  }

  set isLoggedUser(value: boolean) {
    this.isLoggedIn = value;
  }

  public saveUser(): void {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedUser', JSON.stringify(this.isLoggedIn));

    this.router.navigate(['/todo']);
  }

}
