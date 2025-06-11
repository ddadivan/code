import { Component } from '@angular/core';
import {NgControl} from "@angular/forms";

@Component({
  selector: 'app-custom-field-third',
  imports: [],
  templateUrl: './custom-field-third.component.html',
  styleUrl: './custom-field-third.component.scss'
})
export class CustomFieldThirdComponent {


  constructor(private readonly control: NgControl) {

  }

  public get value(): string {
    return this.control.value;
  }
}
