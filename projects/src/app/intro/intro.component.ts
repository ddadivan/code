import {Component, inject, ViewChild} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Test1Component} from "../UI/test-1/test-1.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {priorityButtons, priorityButtonsSecond} from "../projects/todo/interfaces/todo.interfaces";
import {NgTemplateOutlet} from "@angular/common";
import {CustomFieldComponent} from "../UI/custom-field/custom-field.component";

@Component({
  selector: 'app-intro',
  imports: [
    RouterLink,
    Test1Component,
    FormsModule,
    NgTemplateOutlet,
    CustomFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {

  private readonly fb: FormBuilder = inject(FormBuilder);

  @ViewChild('titleField', {static: true}) public test1Component!: Test1Component;

  public title: string = '';

  user = {
    name: 'John',
    age: 30
  }

  public infoForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.infoForm = fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
    })
  }

  public saveChanges(): void {
    console.log(111, this.infoForm.value);
  }

  ngOnInit(): void {
    console.log(111, 'test1Component', this.test1Component);


  }

  ngAfterViewInit() {

    //this.test1Component.textTitle = this.title;

    console.log(111, 'test1Component', this.test1Component);
  }

  protected readonly priorityButtons = priorityButtons;
  protected readonly priorityButtonsSecond = priorityButtonsSecond;
}
