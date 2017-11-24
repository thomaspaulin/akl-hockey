import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {V0_URL} from "../../app/app.constants";
import {v0} from "../../model/api/v0.models";
import {Division} from "../../model/Division";
import {db} from "../../model/dummy-data";

@Injectable()
export class DivisionsProvider {
  private readonly divisionURL = `${V0_URL}/divisions`;

  constructor(public http: HttpClient) {
  }

  fetchAll(): Observable<Division[]> {
    return Observable.of(db.divisions);
    // return this.http.get(this.divisionURL)
    //   .map((resp: v0.Division[]) => divisionsFromServerModel(resp));
  }

  fetch(divID: number): Observable<Division> {
    return Observable.of(db.divisions.find(d => d.ID === divID));
    // return this.http.get(`${this.divisionURL}/${divID}`)
    //   .map((resp: v0.Division) => divisionFromServerModel(resp));
  }
}

export function divisionsFromServerModel(divisions: v0.Division[]): Division[] {
  return divisions.map((div: v0.Division) => divisionFromServerModel(div));
}

export function divisionFromServerModel(div: v0.Division): Division {
  if (!div) {
    return <Division>{
      name: 'Unknown'
    };
  }
  return <Division>{
    ID: div.ID,
    name: div.name
  };
}
