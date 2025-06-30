import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-custom-field',
  imports: [
    FormsModule,
    JsonPipe
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomFieldComponent),
      multi: true
    }
  ],
  templateUrl: './custom-field.component.html',
  styleUrl: './custom-field.component.scss'
})
export class CustomFieldComponent implements ControlValueAccessor {

  @Input() title: string = '';
  @Input() type: string = 'text';

  @Input() parentForm!: FormGroup;
  @Input() fieldName!: string;

  public value: any = '';
  public isDisabled: boolean = false;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  public get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }

}
