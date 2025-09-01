import { ResolveFn } from '@angular/router';
import {ApiUsersService} from "../../shared/services/api-users.service";
import {inject} from "@angular/core";
import {UserApi} from "../rx-js-learn/interfaces/users.interface";
import {Observable} from "rxjs";

export const userInfoResolver: ResolveFn<Observable<UserApi>> = (route, state) => {

  const apiUsersService: ApiUsersService = inject(ApiUsersService);

  const userId = route.paramMap.get('id');

  return apiUsersService.getUserById(Number(userId));
};
