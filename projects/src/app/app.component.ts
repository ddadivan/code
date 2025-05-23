import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './UI/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private router: Router = inject(Router);

  ngOnInit() {
    // this.router.navigate([{outlets: {aux: ['chat']}}]);
  }
}
