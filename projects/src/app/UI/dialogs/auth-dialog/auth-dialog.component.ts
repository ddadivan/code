import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {MatFormField, MatHint, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatSelect} from '@angular/material/select';
import {AuthUserService} from '../../../shared/services/auth-user.service';

@Component({
  selector: 'app-auth-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    MatInput,
    MatDatepickerInput,
    MatHint,
    MatLabel,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatCheckbox, MatSelect, MatOption,
  ],
  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthDialogComponent {

  private dialogRef: MatDialogRef<AuthDialogComponent> = inject(MatDialogRef);
  private authService: AuthUserService = inject(AuthUserService);
  private fb: FormBuilder = inject(FormBuilder);

  public authForm: FormGroup;

  cities = [
    {viewValue: 'Kiev'},
    {viewValue: 'Kharkiv'},
    {viewValue: 'Dnipro'},
  ];

  constructor() {
    this.authForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      passwordConfirm: ['', [Validators.required]],
      date: ['', [Validators.required]],
      isFirst: [false, [Validators.required]],
      city: ['', [Validators.required]],
    },{validators: [this.confirmPassword, this.connectNameLastName]})
  }

  public confirmPassword(group: AbstractControl): ValidationErrors | null {
    if ( group.get('password')?.value !== group.get('passwordConfirm')?.value) {

      return {
        passwordEqual: true
      }
    }

    return null;
  }

  public connectNameLastName(group: AbstractControl): ValidationErrors | null {

    if (!group.get('name')?.value || (!group.get('name')?.value && group.get('lastName')?.value)) {
      return {
        nameFieldEmpty: true,
      }
    }

    return null;

  }

  // public authForm: FormGroup = new FormGroup({
  //   name: new FormControl('', Validators.required),
  //   lastName: new FormControl('', Validators.required),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
  //   passwordConfirm: new FormControl('', [Validators.required]),
  // });

  public controlTouched(controlName: string): boolean | undefined  {
    return this.authForm.get(controlName)?.touched;
  }

  public controlError(controlName: string, errorName: string): boolean | undefined  {
    return this.authForm.get(controlName)?.hasError(errorName);
  }

  public submitForm(): void {
    console.log(this.authForm.value);

    this.authService.saveUser();

    this.dialogRef.close();
  }

  public close(): void {
    this.dialogRef.close();

    // console.log('touched', this.authForm.get('name')?.touched);
    // console.log('required', this.authForm.get('name')?.hasError('required'));
    console.log('errors', this.authForm.errors);

    //this.dialogRef.close({name: 'Dima'});
  }
}
