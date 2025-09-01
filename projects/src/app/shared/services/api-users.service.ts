import {inject, Injectable} from '@angular/core';
import {UserApi} from "../../UI/rx-js-learn/interfaces/users.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {

  private http: HttpClient = inject(HttpClient);

  constructor() { }

  private URL: string = 'http://localhost:8080/api';

  public getUsers(): Observable<UserApi[]> {
    return this.http.get<UserApi[]>(`${this.URL}/users`);
  }

  public getUserById(id: number): Observable<UserApi> {
    return this.http.get<UserApi>(`${this.URL}/users/${id}`);
  }

  public createUser(user: UserApi): Observable<UserApi> {

    const body = JSON.stringify(user);

    return this.http.post<UserApi>(`${this.URL}/users/create`, body, { headers: { 'Content-Type': 'application/json' } });
  }

  public updateWholeUser(user: UserApi, id: number): Observable<void> {

    const body = JSON.stringify(user);

    return this.http.put<void>(`${this.URL}/users/${id}`, body, { headers: { 'Content-Type': 'application/json' } });
  }

  public deleteUser(id: number): Observable<void> {

    return this.http.delete<void>(`${this.URL}/users/${id}`)
  }


  public updateUser(updatedFields: Partial<UserApi>, id: number): Observable<void> {
    const body = JSON.stringify(updatedFields);
    return this.http.patch<void>(`${this.URL}/users/${id}`, body, { headers: { 'Content-Type': 'application/json' } });
  }




}
