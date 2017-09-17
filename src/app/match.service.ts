import { Injectable } from '@angular/core';
import { Match } from '../model/Match';
import { db } from '../model/dummy-data';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MatchService {
    fetchAll(): Observable<Array<Match>> {
      return new BehaviorSubject(db.matches);
    }
}
