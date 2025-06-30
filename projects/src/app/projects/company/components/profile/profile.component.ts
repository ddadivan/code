import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {RouterLink} from "@angular/router";
import {COMPANY_EMPLOYEE} from "../../constants/company.constants";
import {UsersApiService} from "../../shared/users-api.service";
import {IEmployee} from "../../interfaces/company.interfaces";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";

@Component({
  selector: 'app-profile',
  imports: [
    RouterLink,
    EditProfileComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnChanges {

  private usersApiService: UsersApiService = inject(UsersApiService);

  public employeeId: string = '';
  public employee: IEmployee = COMPANY_EMPLOYEE[0];
  public isEditProfile: boolean = false;

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

    this.usersApiService.populateRelatedUsers(COMPANY_EMPLOYEE);
  }

  public showEdit(): void {
    this.isEditProfile = !this.isEditProfile;
  }
}
