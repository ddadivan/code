import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  public set(key: string, data: string): void {
    localStorage.setItem(key, data);
  }

  public get(key: string): string | null {
    return localStorage.getItem(key)
  }

  public setItem(key: string, data: unknown): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getItem(key: string, isEmpty: string = ''): any {
    return JSON.parse(localStorage.getItem(key) ?? isEmpty);
  }

  public delete(data: string): void {
    localStorage.removeItem(data);
  }
}
