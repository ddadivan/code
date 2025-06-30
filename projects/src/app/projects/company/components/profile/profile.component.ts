import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {RouterLink} from "@angular/router";
import {COMPANY_EMPLOYEE} from "../../constants/company.constants";
import {UsersApiService} from "../../shared/users-api.service";
import {IEmployee} from "../../interfaces/company.interfaces";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {DestroyService} from "../../shared/destroy.service";
import {filter, map, takeUntil} from "rxjs";

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
  private readonly destroyService: DestroyService = inject(DestroyService);

  public employeeId: string = '';
  public employee: IEmployee | null = null;
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

    this.usersApiService.employeeList$.pipe(
        map((data: IEmployee[]) => {
          return data.find((item) => item.id === this.employeeId);
        }),
        filter((data: IEmployee | undefined): data is IEmployee => !!data),
        takeUntil(this.destroyService.destroy)
    ).subscribe((data) => {
      this.employee = data;
    });

    this.usersApiService.populateRelatedUsers(COMPANY_EMPLOYEE);
  }

  public showEdit(): void {
    this.isEditProfile = !this.isEditProfile;
  }
}
