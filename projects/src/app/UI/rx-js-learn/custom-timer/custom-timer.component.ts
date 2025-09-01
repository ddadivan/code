import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, interval, map, Subject, takeUntil, tap} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-custom-timer',
  imports: [
    AsyncPipe
  ],
  templateUrl: './custom-timer.component.html',
  styleUrl: './custom-timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTimerComponent implements OnInit {

  private hours: number = 0;
  private minutes: number = 0;
  private seconds: number = 0;
  private milliSeconds: number = 0;


  public customTime: string = '';

  private timer: any;

  private stop$ = new Subject<void>();
  private totalTime: number = 0;

  public time$ = new BehaviorSubject<string>('00:00:00:00');


  ngOnInit() {
   // this.customTime = this.getTime();

    console.log(this.test(2, 10, 6));
  }

  public get getTime(): string {

    const hours = this.hours.toString().padStart(2, '0');
    const minutes = this.minutes.toString().padStart(2, '0');
    const seconds = this.seconds.toString().padStart(2, '0');
    const milliSeconds = this.milliSeconds.toString().padStart(3, '0').slice(-3);

    return `${hours}:${minutes}:${seconds}:${milliSeconds}`;
  }


  public start(): void {

    const period = 20;

    interval(period).pipe(
        takeUntil(this.stop$),
        tap(() => {
          this.totalTime += period;

          this.hours = Math.floor(this.totalTime / (1000 * 60 * 60));
          this.minutes = Math.floor(this.totalTime / (1000 * 60)) % 60;
          this.seconds = Math.floor(this.totalTime / 1000) % 60;
          this.milliSeconds = this.totalTime % 1000;

          this.time$.next(`${this.hours}:${this.minutes}:${this.seconds}:${this.milliSeconds}`);
        }),
    ).subscribe()

    // this.timer = setInterval(() => {
    //   if(this.minutes > 59){
    //     this.hours++;
    //     this.minutes = 0;
    //   }
    //
    //   if(this.seconds > 59){
    //     this.minutes++;
    //     this.seconds = 0;
    //   }
    //
    //   if (this.milliSeconds > 980) {
    //     this.seconds++;
    //     this.milliSeconds = 0;
    //   }
    //
    //   this.milliSeconds += 20;
    // }, 20);
  }

  public pause(): void {
    this.stop$.next();
  }

  public stop(): void {
    this.totalTime = 0;
    this.stop$.next();
    this.time$.next('00:00:00:00');
  }

  // public pause(): void {
  //   clearTimeout(this.timer);
  // }
  //
  // public stop(): void {
  //   clearTimeout(this.timer);
  //
  //   this.hours = 0;
  //   this.minutes = 0;
  //   this.seconds = 0;
  //   this.milliSeconds = 0;
  //
  // }


  public test(...args: number[]) {

    // if (args.length <= 1) {
    //   throw new Error('Test must be at least one argument');
    // }
    //
    // return args.sort((a:number, b:number) => a - b).slice(-2).reduce( (a, b) => a + (b * b), 0);

    interface Item {
      rarity: 'trash' | 'common' | 'rare' | 'legendary',
      statisticalWeight: number;
    }

    const items: Item[] = [
      {rarity: 'trash', statisticalWeight: 50},
      {rarity: 'common', statisticalWeight: 10},
      {rarity: 'rare', statisticalWeight: 3},
      {rarity: 'legendary', statisticalWeight: 1}
    ];

    for (let i = 0; i < 64; i++) {
      console.log(openChest(items).rarity)
    }

    function openChest(items: Item[]): Item {
      return items[0];
    }

  }
}
