import {Component, inject, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Test1Component} from "../UI/test-1/test-1.component";
import {FormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AuthDialogComponent} from "../projects/company/components/auth-dialog/auth-dialog.component";
import {LocalStorageService} from "../shared/services/local-storage.service";

@Component({
  selector: 'app-intro',
  imports: [
    RouterLink,
    Test1Component,
    FormsModule
  ],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {

  @ViewChild('titleField', {static: true}) public test1Component!: Test1Component;

  public title: string = '';
  private readonly dialog: MatDialog = inject(MatDialog);
  private localStorageService:LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);

  ngOnInit(): void {
    console.log(111, 'test1Component', this.test1Component);
  }

  ngAfterViewInit() {

    if (this.test1Component.textTitle) {
      this.test1Component.textTitle = this.title;
    }

    console.log(111, 'test1Component', this.test1Component);
  }

  public logInCompany(): void {

    if (this.localStorageService.getItem('authCompany', 'false')) {
      this.router.navigate(['/company']);

      return;
    }

    this.dialog.open(AuthDialogComponent);
  }

}
