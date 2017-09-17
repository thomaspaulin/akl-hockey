import { Injectable } from '@angular/core';
import { Match } from '../model/Match';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/first';
import { db } from '../model/dummy-data';

@Injectable()
export class MatchService {
  fetchAll(): Observable<Array<Match>> {
    return new BehaviorSubject(db.matches);
  }
}
