import {Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest, concat, concatMap,
  debounce,
  debounceTime,
  delay, distinctUntilChanged, exhaustMap,
  first,
  forkJoin,
  from,
  fromEvent, iif,
  interval,
  map, merge, mergeMap,
  Observable,
  Observer,
  of,
  reduce,
  ReplaySubject,
  scan, share, shareReplay,
  Subject,
  Subscription, switchMap,
  take, takeUntil,
  tap,
  timeout,
  timer,
  toArray, zip
} from "rxjs";
import {filter} from "rxjs/operators";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ApiJsonPlaceholderService} from "../../shared/services/api-json-placeholder.service";
import {User} from "./interfaces/users.interface";
import {DestroyService} from "../../shared/services/destroy.service";

@Component({
  selector: 'app-rx-js-learn',
  imports: [
    FormsModule,
  ],
  providers: [DestroyService],
  templateUrl: './rx-js-learn.component.html',
  styleUrl: './rx-js-learn.component.scss'
})
export class RxJsLearnComponent implements OnInit, OnDestroy {

  private apiJsonPlaceholderService: ApiJsonPlaceholderService = inject(ApiJsonPlaceholderService);
  private destroyService: DestroyService = inject(DestroyService);

  @ViewChild('field', {static: true}) fieldRef!: ElementRef;
  @ViewChild('fieldSearch', {static: true}) fieldSearch!: ElementRef;
  @ViewChild('switchEl', {static: true}) switchEl!: ElementRef;
  @ViewChild('exhaustEl', {static: true}) exhaustEl!: ElementRef;

  private router: Router = inject(Router);

  subscriptions: Subscription[] = [];
  subscriber :Subscription = new Subscription();

  result!: Subscription;


  firstSubject: Subject<string> = new Subject<string>();
  firstBehavior: BehaviorSubject<string> = new BehaviorSubject<string>('');
  firstReplay: ReplaySubject<any> = new ReplaySubject<any>(3);

  numFirst$: Subject<number> = new Subject<number>();
  numSecond$: Subject<number> = new Subject<number>();


  public counter: number = 0;
  public counter$ = of(5);

  public numberList: number[] = [1, 2, 3, 4, 5, 6];
  public numberList$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(this.numberList);


  public counterField: number = 0;
  public counterUp: number = 0;
  public counterUp$: BehaviorSubject<number> = new BehaviorSubject<number>(this.counterUp);

  public users: User[] = [];

  public frases: string[] = ['Hello', 'Hello world', 'city  ', 'Hello city  ', '  I love Rxjs', '  Angular  '];

  public usersList = [
    {
      name: 'John',
      age: 4,
    },
      {
      name: 'Dima',
      age: 24,
    },
      {
      name: 'Mike',
      age: 41,
    },
      {
      name: 'July',
      age: 16,
    },
      {
      name: 'Mark',
      age: 45,
    },
  ];

  public copyUserList = this.usersList;


  public namesList = ['Alex', 'Kostya', 'Mike'];

  public todosIds = [1,2,3,4,5];


  public destroy$: Subject<unknown> = new Subject();

  public increment(): void {
    //this.counter$.next(this.counter$.value + 1);
  }

  public decrement(): void {
   // this.counter$.next(this.counter$.value - 1);
  }

  public changeCounter(value: any): void {
    this.counterUp$.next(value);
  }

  ngAfterViewInit() {

  }
  public  countSwitch = 1
  public switchTest(): void {

    fromEvent(this.switchEl.nativeElement, 'click').pipe(
        switchMap(() =>{
          return this.apiJsonPlaceholderService.getTodos(++this.countSwitch)
        }),
        map((data: any) => {
          return this.countSwitch
        })
    ).subscribe((data) => {
      console.log(666, 'switch', data);
    })
  }

  public  couintExha = 0
  public  ignoreExha = 0
  public  sendExha = 0
  public  isActiveExha = false;
  public exhaustTest(): void {


    fromEvent(this.exhaustEl.nativeElement, 'click').pipe(
        exhaustMap(() =>{

          if (this.isActiveExha) {
            ++this.ignoreExha
          }

          this.isActiveExha = true;

          return this.apiJsonPlaceholderService.getTodos(++this.couintExha)
        })
    ).subscribe((data) => {
      console.log(666, 'all click', this.couintExha);
      console.log(666, 'sended', ++this.sendExha);
      console.log(666, 'ignored', this.ignoreExha);

      this.isActiveExha = false;
    })
  }


  ngOnInit() {

    const todoItem$ = new BehaviorSubject('hello');



    let id = 1;

    const todoItem = todoItem$.pipe(
        switchMap(() => {
          return this.apiJsonPlaceholderService.getTodos(id++)
        }),
        shareReplay(1),
    )

    // todoItem.subscribe((data: any) => {
    //   console.log(999, 'data', data);
    // } );
    //
    // todoItem.pipe(delay(1000)).subscribe((data: any) => {
    //   console.log(999, 'data 2', data);
    // } );
    //
    // timer(2000).subscribe((data: any) => {
    //   todoItem$.next('Hello')
    // })


    const todoShare$ = this.apiJsonPlaceholderService.getTodos(5).pipe(
        share()
    )

    todoShare$.subscribe((data: any) => {
      console.log(10, 'data 1', data);
    })

    todoShare$.subscribe((data: any) => {
      console.log(10, 'data 2', data);
    })

    timer(2000).subscribe((data: any) => {
      todoShare$.subscribe((data: any) => {
        console.log(10, 'data 3', data);
      })
    })


    // from(this.todosIds).pipe(
    //     mergeMap((id) => {
    //       return this.apiJsonPlaceholderService.getTodos(id)
    //     })
    // ).subscribe((data) => {
    //   console.log(222, data);
    //
    // })

    // from(this.todosIds).pipe(
    //     concatMap((id) => {
    //       return this.apiJsonPlaceholderService.getTodos(id).pipe(delay(Math.random() * 3000))
    //     })
    // ).subscribe((data) => {
    //   console.log(333, data);
    //
    // })
    //
    //
    // concat(this.apiJsonPlaceholderService.getTodos(1), this.apiJsonPlaceholderService.getTodos(2)).subscribe((data) => {
    //   console.log(444, data);
    // })
    //
    // merge(this.apiJsonPlaceholderService.getTodos(1), this.apiJsonPlaceholderService.getTodos(2)).subscribe((data) => {
    //   console.log(555, data);
    // })
    //
    // forkJoin(this.apiJsonPlaceholderService.getTodos(1), this.apiJsonPlaceholderService.getTodos(2)).subscribe((data) => {
    //   console.log(222, 'forkJoin', data);
    // })




    from(this.namesList).pipe(
        mergeMap((data) => {
          return of(`My name ${data}`).pipe(delay(Math.random() * 3000))
        })
    ).subscribe((data) => {
      //console.log(222, data);
    })






    fromEvent<Event>(this.fieldSearch.nativeElement, 'input').pipe(
        debounceTime(300),
        map((data: Event) => {
          return (data.target as HTMLInputElement).value;
        }),
        distinctUntilChanged(),
        switchMap((data: string) => {
          return of(this.usersList
              .filter((user)=>
                  user.name.startsWith(data)))
              .pipe(delay(5000))
        })
    ).subscribe((data) => {
      if (data) {
        this.copyUserList = data;
        return;
      }

      this.copyUserList = this.usersList;
    })





    this.numberList$.pipe(
        map((numList) => {
          return numList.filter(num => num % 2 === 0)
        }),
        takeUntil(this.destroyService.destroy)
    ).subscribe((numbers) => {
      console.log('--', numbers);
    })



    from(this.numberList).pipe(
        filter((num) => {
          return num % 2 === 0
        }),
        toArray()
    ).subscribe((numbers) => {
      console.log(numbers);
    })

    of(...this.numberList).pipe(
        filter((num) => {
          return num % 2 === 0
        }),
        toArray()
    ).subscribe((numbers) => {
      console.log(numbers);
    })

    interval(1000).pipe(
        first()
    ).subscribe((num) => {
      console.log(num);
    })

    from(this.frases).pipe(
        delay(2000),
        timeout(2000),
        map((frase) => {
          return frase.trim()
        }),
        filter((frase) => frase.split(' ').length > 1),
    ).subscribe((frases) => {
      console.log(frases);
    })


    const point$ = fromEvent<PointerEvent>(window.document, 'click').pipe(
        // switchMap((event: PointerEvent) => {
        //
        //   // console.log('---', event);
        //   //
        //   // return interval(1000)
        // }),
        catchError((err) => {
          console.log(err);
          return of(err);
        }),
        takeUntil(this.destroyService.destroy)
    )

    point$.subscribe((event: PointerEvent) => {

      console.log('---', event);
      // console.log('x', event.clientX);
      // console.log('y', event.clientY);
    })


    combineLatest([this.numFirst$, this.numSecond$]).subscribe(([first, second]) => {
      console.log('---', first + second);
    })

    // this.numFirst$.next(2);
    // this.numSecond$.next(2);
    //
    // this.numSecond$.next(3);
    // this.numSecond$.next(10);
    // this.numSecond$.next(11);
    //
    // this.numFirst$.next(30);

    zip(this.numFirst$, this.numSecond$).subscribe(([first, second]) => {
      console.log('---zip---', first + second);
    })

    this.numFirst$.next(1);
    this.numSecond$.next(2);
    this.numFirst$.next(3);
    this.numSecond$.next(4);

    console.log('---------------');

    this.apiJsonPlaceholderService.getUsers().pipe(
        map((data) => {
          return data.map((item: User) => {
            item.name = item.name.toUpperCase()
            return item;
          }).filter((item: User) => {
            let email_name = item.email.split('@')[0];

            return email_name.length < 10;
          })
        })
    ).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      }
    })


    // -----------------
   // of(1,2,3,3,21).pipe(map((el)=> el * 2 )).subscribe(console.log);
    this.counterUp$.pipe(
        debounceTime(200),
      map((value) => {
         return value * 2;
      }),
      take(4),
    ).subscribe((value) => {
      this.counterUp = value;
    })

    // fromEvent(this.fieldRef.nativeElement, 'click').subscribe(() => {
    //   console.log('click');
    // })

    // fromEvent(document, 'click').subscribe(() => {
    //   console.log('click');
    // })


    const numberArr: number[] = [1, 2, 3, 4, 5, 10, 20, 15,11,14];


    forkJoin([this.firstSubject, this.firstBehavior]).subscribe((data) => {
      console.log(data);
    })

    of(...numberArr).pipe(
        tap(()=> {

        }),
        scan((acc, value) => {
          return acc + value;
        }),
        first(),
        take(2),
    ).subscribe((data) => {
      console.log(data);
    })

    // interval(1000).pipe(
    //     first(),
    //
    // ).subscribe((data) => {
    //   console.log(data);
    // })


    const count = this.counter$.subscribe((value) => {
      this.counter = value;
    })

    count.unsubscribe();

    this.firstSubject.next('1');
    this.firstSubject.next('2');

    this.firstBehavior.next('11');
    this.firstBehavior.next('22');

    this.firstSubject.subscribe((val) => {
      console.log(val);
    })

    this.firstSubject.next('3');

    this.firstSubject.subscribe((val) => {
      console.log(val);
    })

    this.firstSubject.next('4');
    this.firstSubject.next('5');

    this.firstSubject.complete();
    this.firstBehavior.complete();

    // const firstSubject = this.firstSubject.subscribe((val) => {
    //   console.log('firstSub subscribe', val);
    // })
    //
    // this.firstSubject.next('2');
    //
    // this.firstSubject.subscribe((val) => {
    //   console.log('firstSub subscribe', val);
    // })
    //
    // this.firstSubject.next('3');
    // this.firstSubject.next('4');
    //
    // console.log('--------');
    //
    // this.firstBehavior.next('Behavior 1')
    // this.firstBehavior.next('Behavior 2')
    // this.firstBehavior.next('Behavior 3')
    //
    // const firstBehavior = this.firstBehavior.subscribe((val) => {
    //   console.log('firstBehavior', val);
    // })
    //
    // this.firstBehavior.next('Behavior 4')

    console.log('--------');


    this.firstBehavior.next('1');
    this.firstBehavior.next('2');
    this.firstBehavior.next('3');

    this.firstBehavior.subscribe((val) => {
      console.log(val);
    })

    this.firstBehavior.next('4');

    this.firstBehavior.subscribe((val) => {
      console.log(val);
    })

    this.firstBehavior.next('6');

    this.firstBehavior.subscribe((val) => {
      console.log(val);
    })



    const firstReplay = this.firstReplay.subscribe((val) => {
      console.log('firstReplay', val);
    })

    // this.subscriber.add(firstSubject);
    // this.subscriber.add(firstBehavior);
    this.subscriber.add(firstReplay);

    //
    // console.log('start');
    //
    // const createObserver = new Observable((observer: Observer<any>) => {
    //   observer.next('Hello observer');
    //   //observer.complete();
    // })
    // console.log('middle');
    //
    // this.result = createObserver.subscribe((observer: Observer<any>) => {
    //   console.log(observer);
    //   console.log('end subscribe');
    // })
    //
    // this.subscriptions.push(this.result);
    //
    // const resultSecond = createObserver.subscribe((observer: Observer<any>) => {
    //   console.log(observer);
    //   console.log('end subscribe');
    // })
    //
    // const theirdResult = createObserver.subscribe((observer: Observer<any>) => {
    //   console.log(observer);
    //   console.log('end subscribe');
    // })
    //
    // this.subscriptions.push(resultSecond);
    //
    // this.subscriber.add(this.result);
    // this.subscriber.add(resultSecond);
    // this.subscriber.add(theirdResult);
    //
    // console.log(this.subscriber);
    //
    // //result.unsubscribe();
    //
    // console.log('end');

  }

  ngOnDestroy() {
    //this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());

    this.destroy$.next(true);
    this.destroy$.complete();

    this.subscriber.unsubscribe();

    console.log(this.result.closed);
  }


}

// cold observable - выдает новый потом данных каждому подписчику, пример: запрос на сервер

// hot observable - когда наш обсервбл делаится одним потоком данных между всеми подписчиками
// - Subject
// - BehaviorSubject
// - ReplaySubject
// нужно всегда отписываться !!!
