import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {TopPanelComponent} from "../top-panel/top-panel.component";
import {filter, Subscription, takeUntil} from "rxjs";
import {DestroyService} from "../../shared/destroy.service";
import {AuthCompanyService} from "../../shared/auth-company.service";

@Component({
  selector: 'app-main-company',
  imports: [
    RouterOutlet,
    TopPanelComponent
  ],
  templateUrl: './main-company.component.html',
  standalone: true,
  styleUrl: './main-company.component.scss'
})
export class MainCompanyComponent implements OnInit {

  private router: Router = inject(Router);
  private readonly destroyService: DestroyService = inject(DestroyService);
  private authCompanyService: AuthCompanyService = inject(AuthCompanyService);

  public showTopPanel: boolean = false;

  ngOnInit() {
    this.showTopPanel = (this.router.url === '/company' || this.router.url === '/company/');

    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroyService.destroy)
    ).subscribe((event: NavigationEnd) => {
      this.showTopPanel = (event.urlAfterRedirects === '/company' || event.urlAfterRedirects === '/company/');
    });
  }

  public logout(): void {
    this.authCompanyService.logout();
  }

}
