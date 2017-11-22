import {Injectable} from '@angular/core';
import {Match} from '../model/Match';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import {db} from '../model/dummy-data';
import {HttpClient} from "@angular/common/http";
import {V0_URL} from "./app.constants";

/**
 * @deprecated use providers/match/match.ts instead
 */
@Injectable()
export class MatchService {
  private matchesURL = `${V0_URL}/matches`;

  constructor(private http: HttpClient) {
  }

  fetchAll(): Observable<Array<Match>> {
    this.http.get(this.matchesURL)
      .map(x => x as Match).subscribe(x => console.log(x));

    return new BehaviorSubject(db.matches);
  }
}
