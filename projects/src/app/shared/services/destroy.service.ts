import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class DestroyService implements OnDestroy {

  private destroy$: Subject<void> = new Subject();

  public get destroy() {
    return this.destroy$.asObservable();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
