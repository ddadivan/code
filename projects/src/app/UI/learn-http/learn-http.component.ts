import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {ApiUsersService} from "../../shared/services/api-users.service";
import {UserApi} from "../rx-js-learn/interfaces/users.interface";
import {MatDialog} from "@angular/material/dialog";
import {LearHttpDialogComponent} from "../dialogs/lear-http-dialog/lear-http-dialog.component";
import {filter, startWith, switchMap, withLatestFrom} from "rxjs/operators";
import {ConfirmDialogComponent} from "../dialogs/confirm-dialog/confirm-dialog.component";
import {IConfirm} from "../../projects/todo/interfaces/todo.interfaces";
import {
    BehaviorSubject,
    combineLatest,
    concatMap,
    debounceTime,
    delay, distinctUntilChanged,
    forkJoin,
    from, iif,
    map,
    Observable, shareReplay,
    take,
    tap
} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Router} from "@angular/router";
import {FormControl, ReactiveFormsModule} from "@angular/forms";


type FilterValues = 'all' | 'admins' | 'guests' | 'none';

@Component({
  selector: 'app-learn-http',
    imports: [
        AsyncPipe,
        ReactiveFormsModule
    ],
  templateUrl: './learn-http.component.html',
  styleUrl: './learn-http.component.scss',
})
export class LearnHttpComponent implements OnInit {

  private apiUsersService: ApiUsersService = inject(ApiUsersService);
  readonly dialog = inject(MatDialog);
  readonly router:Router = inject(Router);

  public users$: BehaviorSubject<UserApi[]> = new BehaviorSubject<UserApi[]>([]);
  public sortType$: BehaviorSubject<'asc' | 'desc'> = new BehaviorSubject<'asc' | 'desc'>('asc');
  public filterType$: BehaviorSubject<FilterValues> = new BehaviorSubject<FilterValues>('all');

  public searchField: FormControl = new FormControl('');

    public  searchFieldValue$: Observable<string> = this.searchField.valueChanges.pipe(
        startWith(''),
        distinctUntilChanged(),
        debounceTime(300),
    );

  public sortedUsers$: Observable<UserApi[]> = this.sortUsers();




  constructor(private cdr: ChangeDetectorRef) {
  }

  sortUsers(): Observable<UserApi[]> {
      return combineLatest([
          this.users$,
          this.sortType$,
          this.searchFieldValue$,
          this.filterType$,
      ]).pipe(
          tap(data => {
              console.log('tap', data);
          }),
          map(([users, sortType, valueSearch, filterValue]: [UserApi[], 'asc' | 'desc', string, FilterValues]) => {
              const filteredList = this.filterUser(users,valueSearch, filterValue);
              return  this.sortUser(filteredList, sortType);
          }),
          shareReplay(1)
      )
  }

  public filterUser(users: UserApi[], valueSearch: string, filterValue: FilterValues): UserApi[] {

      const byRole = {
          'all': () => true,
          'none': (item: UserApi) => !item.role,
          'admins': (item: UserApi)=> item.role.toLowerCase() === 'admin',
          'guests': (item: UserApi)=> item.role.toLowerCase() === 'guest',
      }

      return users.filter((item: UserApi) => item.name.toLowerCase().startsWith(valueSearch.toLowerCase()) && byRole[filterValue](item))
  }

  public sortUser(users: UserApi[], sortType: 'asc' | 'desc'): UserApi[] {
      return  users.toSorted((a , b) => {
          return sortType === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      });
  }

  ngOnInit() {
      this.init();

      this.sortedUsers$.subscribe();

      //this.searchUsers();

    //  const obj1 = {
    //       "id": 1,
    //       "name": "Дмитрий Дадиван",
    //       "age":  1,
    //       "email": "dmitriydadivan@gmail.com",
    //       "phone": "997126870",
    //       "address": "Ул.Якова Остряницы",
    //       "city": "Чугуев",
    //       "role": ""
    //     };
    //
    //  const obj2 = {
    //       "id": 2,
    //       "name": "Дмитрий Дадиван",
    //       "age":  2,
    //       "email": "dmitriydadivan@gmail.com",
    //       "phone": "997126870",
    //       "address": "Ул.Якова Остряницы",
    //       "city": "Чугуев",
    //       "role": ""
    //     };
    //
    //  const obj3 = {
    //       "id": 3,
    //       "name": "Дмитрий Дадиван",
    //       "age":  1,
    //       "email": "dmitriydadivan@gmail.com",
    //       "phone": "997126870",
    //       "address": "Ул.Якова Остряницы",
    //       "city": "Чугуев",
    //       "role": ""
    //     };
    //
    // const newUSers = [this.apiUsersService.createUser(obj1), this.apiUsersService.createUser(obj2), this.apiUsersService.createUser(obj3)];
    //
    // forkJoin(newUSers).subscribe((data) => {
    //   console.log(111, data);
    // })
  }
/*
    @sideEffect((originMethod)=>{
      await originMethod();
      this.cdr.detectChanges();
    })Ï*/
  subscribe(){
      /*........*/




  }


  private init() {
    this.apiUsersService.getUsers().subscribe((users: UserApi[]) => {
      this.users$.next(users);

      // this.users.push({
      //   "id": 1,
      //   "name": "Дмитрий Дадиван",
      //   "age":  1,
      //   "email": "dmitriydadivan@gmail.com",
      //   "phone": "997126870",
      //   "address": "Ул.Якова Остряницы",
      //   "city": "Чугуев",
      //   "role": ""
      // })
      // this.cdr.markForCheck();
      console.log(users);
    })
  }

  public createUser(): void {
    this.dialog.open(LearHttpDialogComponent)
        .afterClosed()
        .pipe(
            withLatestFrom(this.users$),
            filter(([newUser, users]): any => {
              return !users.find((user: UserApi) => user.email === newUser.email || user.phone === newUser.phone) || this.confirmCreateUser();
            }),
            switchMap(([newUser, users]) => {
              console.log('switchMap', [newUser, users]);

              return this.apiUsersService.createUser(newUser).pipe(
                  tap((createdUser) => {
                    this.users$.next([...users, createdUser]);
                  })
              );
            })
        )
        .subscribe();
  };

  private confirmCreateUser(): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Такой пользователь уже существет. Хотите создать другого пользователя ?'
      }
    }).afterClosed().subscribe((data: IConfirm) => {
      if (data.confirm) {
        this.createUser();
      }
    })
  }

  public changeUser(user: UserApi) {
    console.log('1', user);
    this.dialog.open(LearHttpDialogComponent, {data: user})
        .afterClosed()
        .subscribe((result) => {
          console.log('2', user);
          console.log('2 result', result);
          if (this.allFieldsChanged(user, result)) {
            this.putUser(result, user.id);
            return;
          }

          const changedFields = this.whatFieldsChanged(user, result);

          this.patchUser(changedFields, user.id);

        })
  }

  public deleteUser(user: UserApi) {
    this.apiUsersService.deleteUser(user.id)
        .pipe(
            withLatestFrom(this.users$),
            map(([_, data]) => {
              return data.filter((item: UserApi) => item.id !== user.id);
            }),
            tap((data) => this.users$.next(data))
        )
        .subscribe();
  }

  private allFieldsChanged(original: UserApi, current: UserApi) {
    const keys = Object.keys(original) as (keyof UserApi)[];

    return keys.every(key => original[key] !== current[key]);
  }

  private whatFieldsChanged(original: UserApi, current: UserApi): Partial<UserApi> {
    const changed: any = {}; //Partial<UserApi>

    const keys = Object.keys(original) as (keyof UserApi)[];
    keys.forEach((key) => {
      if (original[key] !== current[key]) {
        changed[key] = current[key];
      }
    });

    return changed;
  }

  private patchUser(changedFields: Partial<UserApi>, id: number) {
    this.apiUsersService.updateUser(changedFields, id).pipe(
        tap((data) => {
          const changedUsers = this.users$.getValue().map((item: UserApi) => item.id === id ? {...item, ...changedFields, id} : item);
          this.users$.next(changedUsers);
        })
    ).subscribe()
  }

  private putUser(user: UserApi, id: number) {
    this.apiUsersService.updateWholeUser(user, id).pipe(
        withLatestFrom(this.users$),
        map(([_, users]) => {
          return users.map((item) => item.id === id ? {...user, id} : item);
        }),
        tap((data) => {
          this.users$.next(data)
        })
    ).subscribe();
  }

  public deleteAll(): void {

    // this.users$.pipe(
    //     take(1),
    //     switchMap((data) => {
    //       const deleteAllUsers = data.map((item) => this.apiUsersService.deleteUser(item.id))
    //
    //       return forkJoin(deleteAllUsers)
    //     }),
    //     tap((data) => {
    //       this.users$.next([])
    //     })
    // ).subscribe();

    // this.users$.pipe(
    //     take(1),
    //     switchMap((data) => {
    //       return from(data).pipe(
    //           delay(1000),
    //           concatMap((user) => {
    //             return this.apiUsersService.deleteUser(user.id)
    //           })
    //       )
    //     }),
    //     tap((data) => this.users$.next([]))
    // ).subscribe();

    const URL: string = 'http://localhost:8080/api';

    //${URL}/users/${id}


    const deleteAll = this.users$.getValue().map((user: UserApi) => {
      return fetch(`${URL}/users/${user.id}`, {method: 'DELETE', headers: {'Content-Type': 'application/json'}});
    })

    Promise.all(deleteAll)
        .then((data) => this.users$.next([]))


  }

  public userInfo(user: UserApi): void {
    this.router.navigate(['user', user.id]);
  }

  public sortList(event: any): void {
      console.log(event.value);

      this.sortType$.next(event.value);

      // this.users$.pipe(
      //     map((users: UserApi[]) => {
      //         return users.sort((a, b) => {
      //             return event.value === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      //         });
      //     })
      // ).subscribe();
  }

  public filterList(event: any): void {

    this.filterType$.next(event.value);
  }
}
