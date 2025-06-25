import {inject, Injectable} from '@angular/core';
import {IEmployee} from "../interfaces/company.interfaces";
import {COMPANY_EMPLOYEE} from "../constants/company.constants";
import {BehaviorSubject, debounceTime, ReplaySubject} from "rxjs";
import {LocalStorageService} from "../../../shared/services/local-storage.service";
import {sideEffectDecorator} from "../../../utility/decorators/sideEffect";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);

  public companyEmployees: IEmployee[] = [];
  public employeeList$: BehaviorSubject<IEmployee[]> = new BehaviorSubject<IEmployee[]>([]);
  public searchEmployeesFinded: string[] = [];
  public searchEmployees$: ReplaySubject<string[]> = new ReplaySubject<string[]>(5);

  constructor() {

    this.init();
  }


  private init(): void {

    this.companyEmployees = this.localStorageService.getItem('companyEmployees', '[]');
    this.searchEmployeesFinded = this.localStorageService.getItem('searchFindedEmployees', '[]');

    this.employeeList$.next(this.companyEmployees.length ? this.companyEmployees : COMPANY_EMPLOYEE);

    this.searchEmployees$.next(this.searchEmployeesFinded.length ? this.searchEmployeesFinded : []);

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

  public filterEmployeesByWorkPeriod(start: any, end: any): void {
    const startDate = start;
    const endDate = end;

    const filterStartTimestamp = startDate ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime() : null;
    const filterEndTimestamp = endDate ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999).getTime() : null;

    let filteredUsers = [];

    filteredUsers = this.companyEmployees.filter(employee => {
      const employeeWorkTimestamp = new Date(employee.employWorkDate).getTime();

      let isWithinPeriod = true;

      if (filterStartTimestamp !== null) {
        isWithinPeriod = isWithinPeriod && (employeeWorkTimestamp >= filterStartTimestamp);
      }

      if (filterEndTimestamp !== null) {
        isWithinPeriod = isWithinPeriod && (employeeWorkTimestamp <= filterEndTimestamp);
      }

      return isWithinPeriod;
    });


    console.log(filteredUsers);

    this.updateUsersListPicker(filteredUsers);
  }

  private updateUsersListPicker(users: IEmployee[]): void {
    if (users && users.length > 0) {
      this.employeeList$.next(users);
      return;
    }

    this.employeeList$.next(this.companyEmployees);
  }

  public searchEmployee(value: string) {

    if (!value) {
      this.init();
      return;
    }

    this.saveSearchEmployee(value);

    let filteredEmployee = [];

    filteredEmployee = this.companyEmployees.filter((employee: IEmployee) => {

      return (
          employee.firstName.startsWith(value) ||
          employee.lastName.startsWith(value) ||
          employee.departament.startsWith(value) ||
          employee.email.startsWith(value) ||
          employee.position.startsWith(value)
      );
    })

    this.employeeList$.next(filteredEmployee);


  }

  private saveSearchEmployee(value: string): void {
    if (this.searchEmployeesFinded.includes(value)) {
      return;
    }

    this.searchEmployeesFinded.push(value);
    this.searchEmployees$.next(this.searchEmployeesFinded);
    this.localStorageService.setItem('searchFindedEmployees', this.searchEmployeesFinded);
  }

}
