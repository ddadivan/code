import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {UsersApiService} from "../../shared/users-api.service";

@Component({
  selector: 'app-top-panel',
  imports: [
    MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './top-panel.component.html',
  styleUrl: './top-panel.component.scss'
})
export class TopPanelComponent {

  public UsersApiService: UsersApiService = inject(UsersApiService);

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  public deleteChecked(): void {
    this.UsersApiService.deleteChecked();
  }

}
