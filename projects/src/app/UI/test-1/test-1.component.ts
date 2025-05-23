import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-test-1',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './test-1.component.html',
  styleUrl: './test-1.component.scss'
})
export class Test1Component {

}
