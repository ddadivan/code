import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserApi} from "../../rx-js-learn/interfaces/users.interface";

@Component({
  selector: 'app-lear-http-dialog',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './lear-http-dialog.component.html',
  styleUrl: './lear-http-dialog.component.scss'
})
export class LearHttpDialogComponent {

  public form: FormGroup;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<LearHttpDialogComponent>,
      private fb: FormBuilder,
  ) {

    this.form = fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.email, Validators.required] ],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      role: ['', Validators.required],
    })


    if (data) {
      this.form.patchValue(data);
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  public createUser(): void {
    this.dialogRef.close(this.form.value);
  }
}
