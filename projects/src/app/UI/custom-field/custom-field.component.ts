import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-custom-field',
  imports: [],
  templateUrl: './custom-field.component.html',
  styleUrl: './custom-field.component.scss',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CustomFieldComponent), multi: true}]
})
export class CustomFieldComponent implements ControlValueAccessor {


    public value: string = '';
    public onTouched: any = () => {};
    public onChange: any = () => {};

    writeValue(value: any): void {
        this.value = value;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }

    public changeField(event: any): void {
      this.onChange(event.target.value)
    }

}
