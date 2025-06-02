import {Component, ViewChild} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Test1Component} from "../UI/test-1/test-1.component";
import {FormsModule} from "@angular/forms";

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

  ngOnInit(): void {
    console.log(111, 'test1Component', this.test1Component);
  }

  ngAfterViewInit() {

    this.test1Component.textTitle = this.title;

    console.log(111, 'test1Component', this.test1Component);
  }

}
