import {CanDeactivateFn, Router} from "@angular/router";
import {EditProfileComponent} from "../../components/edit-profile/edit-profile.component";
import {inject} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../../UI/dialogs/confirm-dialog/confirm-dialog.component";
import {IConfirm} from "../../../todo/interfaces/todo.interfaces";
import {map, Observable} from "rxjs";

export const employeeDeactivateEdit: CanDeactivateFn<EditProfileComponent> = (component: EditProfileComponent): Observable<boolean> | boolean => {

    const dialog = inject(MatDialog);

    if (component.profileForm?.pristine) {
        return true;
    }

    return dialog.open(ConfirmDialogComponent, {
        data: {
            title: 'Do you really want to leave?',
            description: 'Your unsaved changes will be lost.'
        }
    }).afterClosed().pipe(
        map((data: IConfirm) => {
            return !!data?.confirm;
        })
    );
}
