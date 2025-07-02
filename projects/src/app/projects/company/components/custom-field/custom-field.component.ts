import { Component, Input, Optional, Self } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NgControl
} from "@angular/forms";

@Component({
  selector: 'app-custom-field',
  standalone: true,
  imports: [
    FormsModule
  ],
  providers: [],
  templateUrl: './custom-field.component.html',
  styleUrl: './custom-field.component.scss'
})
export class CustomFieldComponent implements ControlValueAccessor {

  @Input() title: string = '';
  @Input() type: string = 'text';

  public value: any = '';
  public isDisabled: boolean = false;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(@Self() public control: NgControl) {
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  public writeValue(obj: any): void {
    this.value = obj;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  public onBlur(): void {
    this.onTouched();
  }

  public get controlField(): AbstractControl | null {
    return this.control.control;
  }

}
