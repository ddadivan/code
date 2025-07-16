import {CanDeactivateFn, Router} from "@angular/router";
import {EditProfileComponent} from "../../components/edit-profile/edit-profile.component";
import {inject} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../../UI/dialogs/confirm-dialog/confirm-dialog.component";
import {IConfirm} from "../../../todo/interfaces/todo.interfaces";
import {map, Observable, take} from "rxjs";
import {ProfileComponent} from "../../components/profile/profile.component";

export const employeeDeactivateEdit: CanDeactivateFn<ProfileComponent> = (component: ProfileComponent): Observable<boolean> | boolean => {

    const dialog = inject(MatDialog);

    if (!component.isEditProfile || !component.editProfileComponentRef?.profileForm) {
        return true;
    }

    if (component.editProfileComponentRef.profileForm.dirty) {
        return dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'Do you really want to leave?',
                description: 'Your unsaved changes will be lost.'
            }
        }).afterClosed().pipe(
            take(1),
            map((data: IConfirm) => {
                return data.confirm;
            })
        );
    }

    return true;


    // if (component.profileForm?.pristine) {
    //     return true;
    // }
    //
    // return dialog.open(ConfirmDialogComponent, {
    //     data: {
    //         title: 'Do you really want to leave?',
    //         description: 'Your unsaved changes will be lost.'
    //     }
    // }).afterClosed().pipe(
    //     map((data: IConfirm) => {
    //         return !!data?.confirm;
    //     })
    // );
}
