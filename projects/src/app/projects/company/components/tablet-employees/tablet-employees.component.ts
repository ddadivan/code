import {Component, inject, ViewChild} from '@angular/core';
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
import {RouterLink} from "@angular/router";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatTable} from "@angular/material/table";

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
        MatCheckbox,
        RouterLink,
        CdkDropList,
        CdkDrag
    ],
  templateUrl: './tablet-employees.component.html',
  styleUrl: './tablet-employees.component.scss'
})
export class TabletEmployeesComponent {

  public UsersApiService: UsersApiService = inject(UsersApiService);

  @ViewChild('table', {static: true}) table!: MatTable<IEmployee>;

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

  public viewMoreText(id: string): string {
    return this.currentId === id && this.isShowViewMore ? 'Hide view' : 'View more';
  }

  public  drop(event: CdkDragDrop<string>) {
     const previousIndex = this.dataSource.findIndex(d => d === event.item.data);

     moveItemInArray(this.dataSource, previousIndex, event.currentIndex);
     this.table.renderRows();
  }
}
