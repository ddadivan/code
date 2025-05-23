import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  pure: false
})
export class HighlightPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: unknown, background: string, color: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(`<span style="padding: 4px 8px; background-color: ${background}; color: ${color}">${value}</span>`);
  }

}
