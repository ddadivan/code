import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appHoverDirective]'
})
export class HoverDirectiveDirective {

  @HostBinding('disabled')
  public bindSomething = true;


  constructor(private el: ElementRef) {
   /* setInterval(()=>{
      this.bindSomething = !this.bindSomething;
    },500)
  */
    console.log('HoverDirectiveDirective');
  }


  @HostListener('click', ['$event.clientX', '$event.clientY'])
  public logInfo(clientX: number, clientY: number): void {
    console.log('clientX', clientX);
    console.log('clientY', clientY);
  }


  @HostListener('document:keydown.control', ['$event'])
  public logInfo2(event: any): void {
    console.log('event', event);
  }



}
