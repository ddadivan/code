import {inject, Injectable} from '@angular/core';
import {IEmployee} from "../interfaces/company.interfaces";
import {COMPANY_EMPLOYEE} from "../constants/company.constants";
import {BehaviorSubject} from "rxjs";
import {LocalStorageService} from "../../../shared/services/local-storage.service";
import {sideEffectDecorator} from "../../../utility/decorators/sideEffect";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);

  public companyEmployees: IEmployee[] = [];
  public employeeList$: BehaviorSubject<IEmployee[]> = new BehaviorSubject<IEmployee[]>([]);

  constructor() {

    this.companyEmployees = this.localStorageService.getItem('companyEmployees', '[]');

    if (!this.companyEmployees.length) {
      this.companyEmployees = COMPANY_EMPLOYEE;
    }

    this.init();
  }


  private init(): void {
    this.employeeList$.next(this.companyEmployees);
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

  @sideEffectDecorator(`saveListToStorage`)
  public checkedEmployees(id: string, event: any): void {
    this.companyEmployees.forEach(employee => {
      if (employee.id === id) {
        employee.isChecked = event?.checked;
      }
    })
  }

  public checkedAll(event: any): void {
    this.companyEmployees.forEach(employee => {
      employee.isChecked = event?.checked;
    })
  }

  @sideEffectDecorator(`saveListToStorage`)
  public deleteChecked(): void {
    this.companyEmployees = this.companyEmployees.filter((employee: IEmployee) => !employee.isChecked);

    console.log(this.companyEmployees);
  }

  public saveListToStorage(): void {
    this.localStorageService.setItem('companyEmployees', this.companyEmployees);
    this.employeeList$.next(this.companyEmployees);
  }

}
