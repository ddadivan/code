import {Component, inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {companyEmployees} from "../../constants/company.constants";
import {UsersApiService} from "../../shared/users-api.service";
import {IEmployee} from "../../interfaces/company.interfaces";

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);
  private usersApiService: UsersApiService = inject(UsersApiService);

  public employeeId: string = '';
  public employee: IEmployee = companyEmployees[0];

  @Input() set id(value: string) {
    if (value) {
      this.employeeId = value;
    }
  }

  ngOnInit() {
    //this.init();

    this.usersApiService.populateRelatedUsers(companyEmployees);
  }

  public init() {
    this.route.params.subscribe((params) => {
      if (params.hasOwnProperty('id')) {
        this.employeeId = params['id'];
      }
    })
  }

}
