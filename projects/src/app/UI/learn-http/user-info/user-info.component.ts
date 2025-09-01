import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Route} from "@angular/router";
import {UserApi} from "../../rx-js-learn/interfaces/users.interface";

@Component({
  selector: 'app-user-info',
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);

  public user!: UserApi;


  ngOnInit() {
    this.route.data.subscribe((user) => {

      const currentUser = user['user'] as UserApi;

      this.user = currentUser;
      console.log(currentUser );
    })
  }

}
