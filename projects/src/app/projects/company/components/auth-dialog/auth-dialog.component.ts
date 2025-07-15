import {Component, inject} from '@angular/core';
import {CustomFieldComponent} from "../custom-field/custom-field.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LocalStorageService} from "../../../../shared/services/local-storage.service";
import {Router} from "@angular/router";
import {AuthCompanyService} from "../../shared/auth-company.service";

@Component({
    selector: 'app-auth-dialog',
    imports: [
        CustomFieldComponent,
        ReactiveFormsModule
    ],
    templateUrl: './auth-dialog.component.html',
    standalone: true,
    styleUrl: './auth-dialog.component.scss'
})
export class AuthDialogComponent {

    public authForm: FormGroup;
    private fb: FormBuilder = inject(FormBuilder);
    private authCompanyService: AuthCompanyService = inject(AuthCompanyService);
    private router: Router = inject(Router);

    constructor(public dialogRef: MatDialogRef<AuthDialogComponent>) {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }


    public close(): void {
        this.dialogRef.close();
    }

    public submitForm(): void {

        this.authCompanyService.login('authCompany', this.authForm.value);

        this.router.navigate(['/company']);

        this.close();
    }
}
