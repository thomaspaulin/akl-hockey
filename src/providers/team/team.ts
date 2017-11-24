import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {V0_URL} from "../../app/app.constants";
import {v0} from "../../model/api/v0.models";
import {Team} from "../../model/Team";
import {divisionFromServerModel} from "../division/division";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {db} from "../../model/dummy-data";

@Injectable()
export class TeamsProvider {
  // todo cache
  private readonly teamURL = `${V0_URL}/teams`;

  constructor(public http: HttpClient) {
  }

  fetchAll(): Observable<Team[]> {
    return Observable.of(db.teams);
    // return this.http.get(this.teamURL)
    //   .map((serverTeams: v0.Team[]) => teamsFromServerModel(serverTeams));
  }

  fetch(teamID: number): Observable<Team> {
    return Observable.of(db.teams.find(team => team.ID === teamID));
    // return this.http.get(`${this.teamURL}/${divID}`)
    //   .map((serverTeam: v0.Team) => teamFromServerModel(serverTeam));
  }
}

export function teamsFromServerModel(teams: v0.Team[]): Team[] {
  return teams.map(team => teamFromServerModel(team));
}

export function teamFromServerModel(team: v0.Team): Team {
  if (!team) {
    return <Team>{
      name: 'Unknown'
    };
  }
  return <Team>{
    ID: team.ID,
    name: team.name,
    division: divisionFromServerModel(team.division),
    logoURL: team.logoURL,
  };
}
