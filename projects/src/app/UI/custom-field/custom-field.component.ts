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
    public disabled: boolean = false;
    public onTouched: any = () => {};
    public onChange: any = () => {};

    // writeValue(value: any): void {
    //     this.value = value;
    // }
    // registerOnChange(fn: any): void {
    //     this.onChange = fn;
    // }
    // registerOnTouched(fn: any): void {
    //   this.onTouched = fn;
    // }
    // setDisabledState?(isDisabled: boolean): void {
    //     throw new Error('Method not implemented.');
    // }
    //
    // public changeField(event: any): void {
    //   this.onChange(event.target.value)
    // }

    // ---

    writeValue(value: any): void {
        this.value = value;
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
