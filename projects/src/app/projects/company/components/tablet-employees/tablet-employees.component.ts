import {Component, inject} from '@angular/core';
import {
  CdkCell,
  CdkCellDef,
  CdkColumnDef,
  CdkHeaderCell,
  CdkHeaderCellDef,
  CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef,
  CdkTable
} from "@angular/cdk/table";
import {IEmployee} from "../../interfaces/company.interfaces";
import {UsersApiService} from "../../shared/users-api.service";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-tablet-employees',
  imports: [
    CdkTable,
    CdkColumnDef,
    CdkHeaderCell,
    CdkCell,
    CdkCellDef,
    CdkHeaderCellDef,
    CdkHeaderRow,
    CdkHeaderRowDef,
    CdkRowDef,
    CdkRow,
    MatCheckbox
  ],
  templateUrl: './tablet-employees.component.html',
  styleUrl: './tablet-employees.component.scss'
})
export class TabletEmployeesComponent {

  public UsersApiService: UsersApiService = inject(UsersApiService);

  public displayedColumns: string[] = ['isChecked', 'name', 'email', 'departament', 'employWorkDate', 'action', 'info'];

  public dataSource: IEmployee[] = this.UsersApiService.employeesList();

  public isShowViewMore: boolean = false;
  public currentId: string | null = null;

  public viewMoreAction(id: string) {

    if (this.currentId === id) {
      this.isShowViewMore = !this.isShowViewMore;
    } else {
      this.currentId = id;
      this.isShowViewMore = true;
    }
  }

  public showMoreBlock(id: string): boolean {
    return this.isShowViewMore && this.currentId === id;
  }

}
