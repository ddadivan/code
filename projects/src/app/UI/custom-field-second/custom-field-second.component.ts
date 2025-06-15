import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Self} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-custom-field-second',
  imports: [
    UpperCasePipe
  ],
  templateUrl: './custom-field-second.component.html',
  styleUrl: './custom-field-second.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomFieldSecondComponent implements ControlValueAccessor {

  public value: string = '';
  public disabled: boolean = false;
  public onTouched: any = () => {};
  public onChange: any = () => {};

  constructor(@Self() private readonly control: NgControl, private cdr: ChangeDetectorRef) {
    this.control.valueAccessor = this;
  }

  writeValue(value: any): void {
    this.value = value;

    this.cdr.markForCheck()
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public changeField(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.onChange(inputElement.value);
    this.onTouched();
  }

}
