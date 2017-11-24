import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {V0_URL} from "../../app/app.constants";
import {v0} from "../../model/api/v0.models";
import {Rink} from "../../model/Rink";
import {db} from "../../model/dummy-data";

@Injectable()
export class RinksProvider {
  private readonly rinkURL = `${V0_URL}/rinks`;

  constructor(public http: HttpClient) {
  }

  fetchAll(): Observable<Rink[]> {
    return Observable.of(db.rinks);
    // return this.http.get(this.rinkURL)
    //   .map((resp: v0.Rink[]) => rinksFromServerModel(resp))
  }

  fetch(rinkID: number): Observable<Rink> {
    return Observable.of(db.rinks.find(r => r.ID === rinkID));
    // return this.http.get(`${this.rinkURL}/${divID}`)
    //   .map((resp: v0.Rink) => rinkFromServerModel(resp))
  }
}

export function rinksFromServerModel(rinks: v0.Rink[]): Rink[] {
  return rinks.map((rink: v0.Rink) => rinkFromServerModel(rink));
}

export function rinkFromServerModel(rink: v0.Rink): Rink {
  if (!rink) {
    return <Rink>{
      name: 'Unknown'
    };
  }
  return <Rink>{
    name: rink.name
  };
}
