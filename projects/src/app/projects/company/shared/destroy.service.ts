import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DestroyService implements OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  public get destroy() {
    return this.destroy$.asObservable();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
