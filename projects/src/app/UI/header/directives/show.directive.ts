import {Directive, inject, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appShow]'
})
export class ShowDirective {
  private templateRef: TemplateRef<unknown> = inject(TemplateRef);
  private viewContainerRef: ViewContainerRef = inject(ViewContainerRef);

  @Input('appShow') public set show(isShow: boolean) {

    if (isShow) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      return;
    }

    this.viewContainerRef.clear();
  }
}
