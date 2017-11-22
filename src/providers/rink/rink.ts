import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {V0_URL} from "../../app/app.constants";
import {v0} from "../../model/api/v0.models";
import {Rink} from "../../model/Rink";

@Injectable()
export class RinksProvider {
  private readonly rinkURL = `${V0_URL}/Rinks`;

  constructor(public http: HttpClient) {
  }

  fetchAll(): Observable<Rink[]> {
    return this.http.get(this.rinkURL)
      .map((resp: v0.Rink[]) => RinksFromServerModel(resp))
  }

  fetch(divID: number): Observable<Rink> {
    return this.http.get(`${this.rinkURL}/${divID}`)
      .map((resp: v0.Rink) => fromServerModel(resp))
  }
}

function RinksFromServerModel(rinks: v0.Rink[]): Rink[] {
  return rinks.map((rink: v0.Rink) => fromServerModel(rink));
}

function fromServerModel(div: v0.Rink): Rink {
  return <Rink>{
    name: div.name
  };
}
