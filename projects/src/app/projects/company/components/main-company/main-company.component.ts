import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {TopPanelComponent} from "../top-panel/top-panel.component";

@Component({
  selector: 'app-main-company',
  imports: [
    RouterOutlet,
    TopPanelComponent
  ],
  templateUrl: './main-company.component.html',
  styleUrl: './main-company.component.scss'
})
export class MainCompanyComponent {


}
