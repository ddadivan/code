import {Component, inject, OnInit} from '@angular/core';
import {AuthDialogComponent} from '../dialogs/auth-dialog/auth-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthUserService} from "../../shared/services/auth-user.service";
import {ShowDirective} from "./directives/show.directive";

@Component({
  selector: 'app-header',
  imports: [
    ShowDirective
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  private authService: AuthUserService = inject(AuthUserService);
  private router = inject(Router);

  public user = this.authService.user;

  ngOnInit() {
  }

  public openAuth(): void {

    this.router.navigate(['/auth']);
  }

  public logout(): void {
    this.authService.logout();

    this.router.navigate(['/']);
  }

  public redirectPage(): void {

    this.router.navigate(['/']);
  }

}
