import {Component, Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-test-2',
  imports: [],
  templateUrl: './test-2.component.html',
  styleUrl: './test-2.component.scss'
})
export class Test2Component {

  @Input('name') userName: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {

  }

  ngDoCheck() {
    // при каждом изменении чего-то
  }

  ngAfterContentInit() {
    // ContentChild
  }

  ngAfterContentChecked() {
    // при смене передаваемого контента
  }

  ngAfterViewInit() {
    // после инициализации компонента
    // доступно ViewChild ( но если не использовать static, потому что он будет виден и до инициализации )
  }

  ngAfterViewChecked() {

  }

  ngOnDestroy() {
    // избегать утечек памяти
  }

}
