import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsersApiService} from "../../shared/users-api.service";
import {IEmployee} from "../../interfaces/company.interfaces";
import {CustomFieldComponent} from "../custom-field/custom-field.component";
import {ConfirmDialogComponent} from "../../../../UI/dialogs/confirm-dialog/confirm-dialog.component";
import {takeUntil} from "rxjs";
import {IConfirm} from "../../../todo/interfaces/todo.interfaces";
import {MatDialog} from "@angular/material/dialog";
import {DestroyService} from "../../shared/destroy.service";

@Component({
  selector: 'app-edit-profile',
  imports: [
    ReactiveFormsModule,
    CustomFieldComponent
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {

  @Input() public id: string = '';
  @Output() public close$: EventEmitter<boolean> = new EventEmitter();

  public UsersApiService: UsersApiService = inject(UsersApiService);
  private readonly dialog: MatDialog = inject(MatDialog);
  public destroyService: DestroyService = inject(DestroyService);

  public currentEmployee: IEmployee | null = null;
  public profileForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.currentEmployee = this.UsersApiService.findEmployee(this.id);

    this.profileForm = this.buildForm(this.currentEmployee);

    console.log(this.profileForm);
  }

  public buildForm(employee: IEmployee): FormGroup {
    return this.fb.group({
      firstName: [employee.firstName || '', Validators.required],
      lastName: [employee.lastName || '', Validators.required],
      age: [employee.age || null, [Validators.required, Validators.min(18)]],
      email: [employee.email || '', [Validators.required, Validators.email]],
      position: [employee.position || '', Validators.required],
      departament: [employee.departament || '', Validators.required],
      employWorkDate: [employee.employWorkDate || '', Validators.required],
      address: this.fb.group({
        city: [employee.address?.city || '', Validators.required],
        street: [employee.address?.street || '', Validators.required],
        zipCode: [employee.address?.zipCode || '', [Validators.required, Validators.minLength(5)]],
      }),
    })
  }

  public submitForm(): void {


    this.currentEmployee = {
      ...this.currentEmployee,
      ...this.profileForm.value
    };

    if (this.currentEmployee) {
      this.UsersApiService.updateEmployee(this.currentEmployee);
    }

    this.close$.next(false);
  }

  public cancelChanges(): void {

    if (this.profileForm.pristine) {
      this.close$.emit(false);
      return;
    }

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Do you really want to go back?',
        description: 'Your changes will not be saved.'
      }
    }).afterClosed()
        .pipe(
            takeUntil(this.destroyService.destroy)
        )
        .subscribe((data: IConfirm) => {
          if (data.confirm) {
            this.close$.emit(false);
          }
        })

  }

  public get disabledSubmit(): boolean {
    return this.profileForm.invalid || this.profileForm.pristine;
  }

}
