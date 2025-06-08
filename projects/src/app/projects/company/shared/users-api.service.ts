import { Injectable } from '@angular/core';
import {IEmployee} from "../interfaces/company.interfaces";
import {companyEmployees} from "../constants/company.constants";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {


  public companyEmployees: IEmployee[] = companyEmployees;

  constructor() { }


  public employeesList(): IEmployee[] {
    return this.companyEmployees;
  }

  public populateRelatedUsers(employees: IEmployee[]): void {
    this.companyEmployees.forEach(user => {
      user.relatedUsers = employees.filter(
          otherUser => otherUser.departament === user.departament && otherUser.id !== user.id
      );
    });
  }

  public findEmployee(id: string): IEmployee {
    return <IEmployee>this.companyEmployees.find((item: IEmployee) => item.id === id);
  }


}
