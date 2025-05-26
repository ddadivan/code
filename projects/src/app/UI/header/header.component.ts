import {Component, inject} from '@angular/core';
import {AuthDialogComponent} from '../dialogs/auth-dialog/auth-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  readonly dialog = inject(MatDialog);
  private router = inject(Router);

  public openAuth(): void {

    this.router.navigate(['/auth']);

    // this.dialog.open(AuthDialogComponent).afterClosed().subscribe((result) => {
    //   if (result) {
    //     console.log(result);
    //   }
    // })
  }



  public redirectPage(): void {

    this.router.navigate(['/']);
  }

}
