import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {V0_URL} from "../../app/app.constants";
import {v0} from "../../model/api/v0.models";
import {Team} from "../../model/Team";
import {Division} from "../../model/Division";

@Injectable()
export class TeamsProvider {
  private readonly teamURL = `${V0_URL}/teams`;

  constructor(public http: HttpClient) {
  }

  fetchAll(): Observable<Team[]> {
    return this.http.get(this.teamURL)
      .map((resp: v0.Team[]) => teamsFromServerModel(resp))
  }

  fetch(divID: number): Observable<Team> {
    return this.http.get(`${this.teamURL}/${divID}`)
      .map((resp: v0.Team) => fromServerModel(resp))
  }
}

function teamsFromServerModel(teams: v0.Team[]): Team[] {
  return teams.map((div: v0.Team) => fromServerModel(div));
}

function fromServerModel(team: v0.Team): Team {
  let div = <Division>{name: "Temp"}; //todo make the request then use some kind of store or similar to cache
  return <Team>{
    name: team.name,
    division: div,
    logoURL: team.logoURL,
  };
}
