import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsersApiService} from "../../shared/users-api.service";
import {IEmployee} from "../../interfaces/company.interfaces";
import {CustomFieldComponent} from "../custom-field/custom-field.component";

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

  public currentEmployee: IEmployee | null = null;
  public profileForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.currentEmployee = this.UsersApiService.findEmployee(this.id);

    this.profileForm = this.buildForm(this.currentEmployee);
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
        zipCode: [employee.address?.zipCode || '', Validators.required],
      }),
    })
  }

  public submitForm(): void {

  }

  public cancelChanges(): void {
    this.close$.emit(false);
  }

}
