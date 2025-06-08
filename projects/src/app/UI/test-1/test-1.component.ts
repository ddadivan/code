import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {HoverDirectiveDirective} from "../../shared/directives/hover-directive.directive";
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-test-1',
  imports: [
    RouterOutlet,
    RouterLink,
    FormsModule,
    HoverDirectiveDirective,
    NgTemplateOutlet
  ],
  templateUrl: './test-1.component.html',
  styleUrl: './test-1.component.scss'
})
export class Test1Component {

  @Input() public status: 'loading' | 'error' | 'success' = 'loading';
  @Input() loading!: TemplateRef<any>;
  @Input() error!: TemplateRef<any>;
  @Input() success!: TemplateRef<any>;

  @Input() content!: TemplateRef<any>;
  @Input() data: any;

  @Input() public textTitle: string = '';
  @Output() public textTitleChange: EventEmitter<string> = new EventEmitter();

  @ViewChild('emptyBlock') emptyBlock!: TemplateRef<any>;
  @ViewChild('emptyBlockTitle') emptyBlockTitle!: TemplateRef<any>;

  public updateTitle(): void {
    this.textTitleChange.emit(this.textTitle);
  }


  public getCurrentTemplate() {
    switch (this.status) {
      case 'loading': {
        return this.loading
      }
      case 'error': {
        return this.error
      }
      case 'success': {
        return this.success
      }
    }
  }

  public changeTemplate(content: string): void {
    switch (content) {
      case 'emptyBlock': {
        this.content = this.emptyBlock;
        break;
      }
      case 'emptyBlockTitle': {
        this.content = this.emptyBlockTitle;
        break;
      }
    }
  }

}
