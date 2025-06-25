import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
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
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {FormsModule} from "@angular/forms";
import {first} from "rxjs";

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
        CdkDrag,
        MatPaginator,
        MatSort,
        MatSortHeader,
        FormsModule,
    ],
    templateUrl: './tablet-employees.component.html',
    styleUrl: './tablet-employees.component.scss'
})
export class TabletEmployeesComponent implements AfterViewInit {

    public UsersApiService: UsersApiService = inject(UsersApiService);

    @ViewChild('table', {static: true}) table!: MatTable<IEmployee>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    public displayedColumns: string[] = ['isChecked', 'name', 'email', 'departament', 'employWorkDate', 'action', 'info'];

    public dataSource = new MatTableDataSource<IEmployee>();
    public isShowViewMore: boolean = false;
    public currentId: string | null = null;

    public sortedData: IEmployee[] = this.dataSource.data.slice();

    ngAfterViewInit() {

        this.UsersApiService.employeeList$.subscribe((list: IEmployee[]) => {
            this.dataSource = new MatTableDataSource<IEmployee>(list);

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.sortedData = [...list];

            console.log(111, this.dataSource.data.length);
        })

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.sortingDataAccessor = (item: IEmployee, property: string) => {
            switch (property) {
                case 'name':
                    return `${item.lastName} ${item.firstName}`;
                case 'employWorkDate':
                    return new Date(item.employWorkDate);
                default:
                    return (item as any)[property];
            }
        };
    }

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

    public drop(event: CdkDragDrop<string>) {
        const previousIndex = this.dataSource.data.findIndex(d => d === event.item.data);

        moveItemInArray(this.dataSource.data, previousIndex, event.currentIndex);
        this.dataSource.data = [...this.dataSource.data];
    }

    public sortData(sort: Sort) {
        const data = this.sortedData.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedData = data;
            return;
        }

        this.sortedData = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'name':
                    return this.compare(`${a.firstName} ${a.lastName}`, `${b.firstName} ${b.lastName}`, isAsc);
                case 'email':
                    return this.compare(a.email, b.email, isAsc);
                case 'departament':
                    return this.compare(a.departament, b.departament, isAsc);
                case 'employWorkDate':
                    return this.sortDates(a, b, isAsc);
                default:
                    return 0;
            }
        });
    }

    private compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    private sortDates(a: IEmployee, b: IEmployee, isAsc: boolean): number {
        const dateA = new Date(a.employWorkDate);
        const dateB = new Date(b.employWorkDate);
        return (dateA.getTime() < dateB.getTime() ? -1 : 1) * (isAsc ? 1 : -1);
    }

    public checkedItem(id: string, event:any,): void  {
        this.UsersApiService.checkedEmployees(id, event);
    }

    public checkedAll(event: any): void  {
        this.UsersApiService.checkedAll(event);
    }
}
