import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {UsersApiService} from "../../shared/users-api.service";
import {debounceTime, filter} from "rxjs";
import {ConfirmDialogComponent} from "../../../../UI/dialogs/confirm-dialog/confirm-dialog.component";
import {IConfirm} from "../../../todo/interfaces/todo.interfaces";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-top-panel',
  imports: [
    MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './top-panel.component.html',
  standalone: true,
  styleUrl: './top-panel.component.scss'
})
export class TopPanelComponent implements OnInit {

  @ViewChild('search') searchRef!: ElementRef;

  private readonly dialog: MatDialog = inject(MatDialog);
  public UsersApiService: UsersApiService = inject(UsersApiService);

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  public isShowFindList: boolean = false;
  public searchList: string[] = [];
  public searchValue: string = '';


  ngOnInit(): void {

    this.checkDatePicker();

    this.initSearchList();

  }

  private initSearchList() {
    this.UsersApiService.searchEmployees$.pipe(
        debounceTime(500),
    ).subscribe((data: string[]) => {
      this.searchList = data;
    })
  }

  public checkDatePicker(): void {
    this.range.valueChanges.pipe(
        filter(value => !!(value.start && value.end)),
        debounceTime(1000)
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
    }).afterClosed().subscribe((data: IConfirm) => {

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


}
