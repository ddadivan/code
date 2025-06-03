import { Injectable } from '@angular/core';
import {companyEmployees, IEmployee} from "../interfaces/company.interfaces";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {


  companyEmployees: IEmployee[] = companyEmployees;

  constructor() { }


  public employeesList(): IEmployee[] {
    return this.companyEmployees;
  }

  private populateRelatedUsers(employees: IEmployee[]): void {
    this.companyEmployees.forEach(user => {
      user.relatedUsers = employees.filter(
          otherUser => otherUser.departament === user.departament && otherUser.id !== user.id
      );
    });
  }


}
