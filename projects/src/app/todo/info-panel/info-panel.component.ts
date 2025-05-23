import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-info-panel',
  imports: [
    FormsModule
  ],
  templateUrl: './info-panel.component.html',
  styleUrl: './info-panel.component.scss'
})
export class InfoPanelComponent implements OnInit {

  @Input() title: string = 'default value';
  @Output() titleChange: EventEmitter<string> = new EventEmitter();


  ngOnInit(): void {

  }
  public updateTitle2(value:string): void  {
    console.log('value', value);
    this.titleChange.emit(value);
  }

  public updateTitle(event: HTMLInputElement): void  {
    console.log('value', event.value);
  }

}
