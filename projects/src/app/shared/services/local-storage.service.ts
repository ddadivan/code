import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  set(key: string, data: string): void {
    localStorage.setItem(key, data);
  }

  get(key: string): string | null {
    return localStorage.getItem(key)
  }

  setItem(key: string, data: unknown): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getItem(key: string, isEmpty: string = ''): any {
    return JSON.parse(localStorage.getItem(key) ?? isEmpty);
  }

  delete(data: string): void {
    localStorage.removeItem(data);
  }
}
