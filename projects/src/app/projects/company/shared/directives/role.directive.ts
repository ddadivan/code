import {Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthCompanyService} from "../auth-company.service";

@Directive({
  standalone: true,
  selector: '[appRole]'
})
export class RoleDirective implements OnInit {

  private authCompanyService: AuthCompanyService = inject(AuthCompanyService);

  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  constructor() { }

  ngOnInit(): void {

    if (this.authCompanyService.isAdmin()) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

}
