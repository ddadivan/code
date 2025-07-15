import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {UsersApiService} from "../../shared/users-api.service";
import {debounceTime, filter, takeUntil} from "rxjs";
import {ConfirmDialogComponent} from "../../../../UI/dialogs/confirm-dialog/confirm-dialog.component";
import {IConfirm} from "../../../todo/interfaces/todo.interfaces";
import {MatDialog} from "@angular/material/dialog";
import {DestroyService} from "../../shared/destroy.service";
import {RoleEnums} from "../../enums/role.enums";
import {RoleDirective} from "../../shared/directives/role.directive";

@Component({
  selector: 'app-top-panel',
  imports: [
    MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, RoleDirective
  ],
  providers: [DestroyService],
  templateUrl: './top-panel.component.html',
  standalone: true,
  styleUrl: './top-panel.component.scss'
})
export class TopPanelComponent implements OnInit {

  @ViewChild('search') searchRef!: ElementRef;

  private readonly dialog: MatDialog = inject(MatDialog);
  public UsersApiService: UsersApiService = inject(UsersApiService);
  public destroyService: DestroyService = inject(DestroyService);

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  public isShowFindList: boolean = false;
  public searchList: string[] = [];
  public searchValue: string = '';
  public isErrorEmptyList: boolean = false;
  public isCheckedItems: boolean = false;

  protected readonly RoleEnums = RoleEnums;


  ngOnInit(): void {

    this.checkDatePicker();

    this.initSearchList();

    this.checkedItems();
  }

  private initSearchList() {
    this.UsersApiService.searchEmployees$.pipe(
        debounceTime(1000),
        takeUntil(this.destroyService.destroy)
    ).subscribe((data: string[]) => {
      this.searchList = data.slice(-5).reverse();
    })
  }

  private checkedItems() {
    this.UsersApiService.hasCheckedEmployees$.pipe(
        takeUntil(this.destroyService.destroy),
    ).subscribe((data: boolean) => {
      this.isCheckedItems = data;
    })
  }

  public checkDatePicker(): void {
    this.range.valueChanges.pipe(
        filter(value => !!(value.start && value.end)),
        debounceTime(1000),
        takeUntil(this.destroyService.destroy)
    ).subscribe(value => {

      const {start, end} = value;

      this.UsersApiService.filterEmployeesByWorkPeriod(start, end);

    });
  }

  public deleteChecked(): void {

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Do you want delete ALL selected employees?',
        description: 'You won\'t be able to bring back all your remote workers.'
      }
    }).afterClosed()
        .pipe(
            takeUntil(this.destroyService.destroy)
        )
        .subscribe((data: IConfirm) => {
          if (data.confirm) {
            this.UsersApiService.deleteChecked();
          }
    })

  }

  public showFindList(event: any): void {

    if (this.isShowFindList) {
      return;
    }

    this.isShowFindList = true;
  }

  public searchChange(value: string): void {

    this.UsersApiService.searchEmployee(value.trim());

    this.isShowFindList = false;
  }

  public searchBlur(value: string): void {
    this.isShowFindList = false;
    //this.searchChange(value);
  }

  public selectSearchItem(value: string): void {

    this.isShowFindList = false;
    this.searchValue = value;

    this.searchChange(this.searchValue);
  }

  public get showSearchList(): boolean {
    return !!(this.searchList.length && this.isShowFindList);
  }

  public clearSearch(): void {
    this.searchValue = '';
    this.searchChange(this.searchValue);
  }

  public get clearButtonDate(): boolean {
    return !!(this.range.controls.start.value && this.range.controls.end.value);
  }

  public clearDateField(): void {

    this.range.reset();

    this.UsersApiService.clearDateField();
  }
}
