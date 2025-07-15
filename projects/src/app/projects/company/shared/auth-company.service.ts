import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from "../../../shared/services/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthCompanyService {

  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() { }

  public login(name: string, data: unknown): void {
    this.localStorageService.setItem(name, data);
  }

  public isAuthenticated(): boolean {
    return !!this.localStorageService.getItem('authCompany', 'false');
  }
}
