import {Injectable} from '@angular/core';
import {Firebase} from "@ionic-native/firebase";

/**
 * Provides the Firebase interactions
 */
@Injectable()
export class FirebaseService {

  constructor(private firebase: Firebase) {
  }


}
