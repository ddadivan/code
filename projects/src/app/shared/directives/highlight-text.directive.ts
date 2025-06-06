import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHighlightText]'
})
export class HighlightTextDirective implements OnInit {

  constructor(private el: ElementRef, private renderer2: Renderer2) {

  }


  public ngOnInit() {
    this.classForEl();
  }

  public classForEl() {
    this.renderer2.addClass(this.el.nativeElement, 'highlight');
  }
}
