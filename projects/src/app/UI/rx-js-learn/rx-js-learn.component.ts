import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Observer, ReplaySubject, Subject, Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rx-js-learn',
  imports: [],
  templateUrl: './rx-js-learn.component.html',
  styleUrl: './rx-js-learn.component.scss'
})
export class RxJsLearnComponent implements OnInit, OnDestroy {

  private router: Router = inject(Router);

  subscriptions: Subscription[] = [];
  subscriber :Subscription = new Subscription();

  result!: Subscription;


  firstSubject: Subject<string> = new Subject<string>();
  firstBehavior: BehaviorSubject<string> = new BehaviorSubject<string>('');
  firstReplay: ReplaySubject<any> = new ReplaySubject<any>(3);



  ngOnInit() {

    this.firstSubject.next('1');


    const firstSubject = this.firstSubject.subscribe((val) => {
      console.log('firstSub subscribe', val);
    })

    this.firstSubject.next('2');

    this.firstSubject.subscribe((val) => {
      console.log('firstSub subscribe', val);
    })

    this.firstSubject.next('3');
    this.firstSubject.next('4');

    console.log('--------');

    this.firstBehavior.next('Behavior 1')
    this.firstBehavior.next('Behavior 2')
    this.firstBehavior.next('Behavior 3')

    const firstBehavior = this.firstBehavior.subscribe((val) => {
      console.log('firstBehavior', val);
    })

    this.firstBehavior.next('Behavior 4')

    console.log('--------');


    this.firstReplay.next('ReplaySub 1');
    this.firstReplay.next('ReplaySub 2');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next('ReplaySub 3');
    this.firstReplay.next({name: 'ReplaySub 1', age: 28});
    this.firstReplay.next({name: 'ReplaySub 2', age: 14});
    this.firstReplay.next({name: 'ReplaySub 3', age: 55});


    const firstReplay = this.firstReplay.subscribe((val) => {
      console.log('firstReplay', val);
    })

    this.subscriber.add(firstSubject);
    this.subscriber.add(firstBehavior);
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
