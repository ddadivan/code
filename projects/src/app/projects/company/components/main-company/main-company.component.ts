import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {TopPanelComponent} from "../top-panel/top-panel.component";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-main-company',
  imports: [
    RouterOutlet,
    TopPanelComponent
  ],
  templateUrl: './main-company.component.html',
  styleUrl: './main-company.component.scss'
})
export class MainCompanyComponent implements OnInit, OnDestroy {

  private router: Router = inject(Router);

  public showTopPanel: boolean = true;
  private routerSubscription!: Subscription;

  ngOnInit() {
    this.routerSubscription = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showTopPanel = event.url === '/company';
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
