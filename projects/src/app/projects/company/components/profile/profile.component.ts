import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {companyEmployees} from "../../constants/company.constants";
import {UsersApiService} from "../../shared/users-api.service";
import {IEmployee} from "../../interfaces/company.interfaces";

@Component({
  selector: 'app-profile',
  imports: [
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnChanges {

  private usersApiService: UsersApiService = inject(UsersApiService);

  public employeeId: string = '';
  public employee: IEmployee = companyEmployees[0];

  @Input() set id(value: string) {
    if (value) {
      this.employeeId = value;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.init();
  }

  public init() {

    this.employee = this.usersApiService.findEmployee(this.employeeId);

    this.usersApiService.populateRelatedUsers(companyEmployees);
  }

}
