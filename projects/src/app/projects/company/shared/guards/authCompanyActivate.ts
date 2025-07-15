import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {inject} from "@angular/core";
import {AuthCompanyService} from "../auth-company.service";
import {AuthDialogComponent} from "../../components/auth-dialog/auth-dialog.component";
import {MatDialog} from "@angular/material/dialog";


export const authCompanyActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {

    const authCompanyService = inject(AuthCompanyService);
    const router = inject(Router);
    const dialog = inject(MatDialog);

    if (authCompanyService.isAuthenticated()) {
        return true;
    }

    dialog.open(AuthDialogComponent);
    return router.createUrlTree(['/']);
};
