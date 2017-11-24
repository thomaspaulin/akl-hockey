import {Subject} from 'rxjs/Subject';

/**
 * Removes subscriptions on ngDestroy lifecycle event to prevent memory overflows
 * and other unexpected behaviours.
 */
export class CleanUpOnViewWillUnload {

  // @see https://stackoverflow.com/questions/38008334/angular-rxjs-when-should-i-unsubscribe-from-subscription
  protected ngUnsubscribe: Subject<void> = new Subject<void>();


  ionViewWillUnload() {
    console.log('ionViewWillUnload fired. Cleaning up subscriptions');
    // @see https://stackoverflow.com/a/41177163
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
