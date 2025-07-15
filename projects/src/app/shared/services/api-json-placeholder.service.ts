import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../UI/rx-js-learn/interfaces/users.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiJsonPlaceholderService {

  private http: HttpClient = inject(HttpClient);

  private url = "https://jsonplaceholder.typicode.com";

  constructor() {

  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  public getTodos(id: number): any {
    return this.http.get<User[]>(`${this.url}/photos/${id}`);
  }
}
