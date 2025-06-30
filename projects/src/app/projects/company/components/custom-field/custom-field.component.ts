import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-custom-field',
  imports: [
    FormsModule
  ],
  templateUrl: './custom-field.component.html',
  styleUrl: './custom-field.component.scss'
})
export class CustomFieldComponent {

  @Input() title: string = ''


}
