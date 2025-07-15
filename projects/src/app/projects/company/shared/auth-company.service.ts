import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from "../../../shared/services/local-storage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthCompanyService {

  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);

  constructor() { }

  public login(name: string, data: unknown): void {
    this.localStorageService.setItem(name, data);
  }

  public isAuthenticated(): boolean {
    return !!this.localStorageService.getItem('authCompany', 'false');
  }

  public isAdmin(): boolean {
    return this.localStorageService.getItem('authCompany', 'true').email === 'admin@example.com';
  }

  public logout(): void {
    this.router.navigate(['/']);

    this.localStorageService.delete('authCompany');
  }
}
