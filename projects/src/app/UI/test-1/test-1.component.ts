import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {HoverDirectiveDirective} from "../../shared/directives/hover-directive.directive";

@Component({
  selector: 'app-test-1',
  imports: [
    RouterOutlet,
    RouterLink,
    FormsModule,
    HoverDirectiveDirective
  ],
  templateUrl: './test-1.component.html',
  styleUrl: './test-1.component.scss'
})
export class Test1Component {

  @Input() public textTitle: string = '';
  @Output() public textTitleChange: EventEmitter<string> = new EventEmitter();


  public updateTitle(): void {
    this.textTitleChange.emit(this.textTitle);
  }

}
