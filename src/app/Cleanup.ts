import {Subject} from 'rxjs/Subject';
import {OnDestroy} from '@angular/core';
/**
 * Removes subscriptions on ngDestroy lifecycle event to prevent memory overflows
 * and other unexpected behaviours.
 */
export class CleanUp {

  // @see https://stackoverflow.com/questions/38008334/angular-rxjs-when-should-i-unsubscribe-from-subscription
  protected ngUnsubscribe: Subject<void> = new Subject<void>();


  ionViewDidLeave() {
    console.log('view did leave');
    // @see https://stackoverflow.com/a/41177163
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
