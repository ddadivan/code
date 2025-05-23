import {inject, Injectable} from '@angular/core';
import {Router, RouterStateSnapshot, TitleStrategy} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CustomTitleStrategyService extends TitleStrategy{

  private title: Title = inject(Title);

  constructor() {
    super();
  }

  public override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);

    console.log(snapshot);

    const updateTitle = title?.split(' ').join(' \u2022 ');

    if (updateTitle) {
      this.title.setTitle(updateTitle);
    }
  }

}
