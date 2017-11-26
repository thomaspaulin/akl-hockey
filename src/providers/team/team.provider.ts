import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {V0_URL} from "../../app/app.constants";
import {v0} from "../../model/api/v0.models";
import {Team} from "../../model/Team";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class TeamsProvider {
  // todo cache
  private readonly teamURL = `${V0_URL}/teams`;

  constructor(public http: HttpClient) {
  }

  fetchAll(): Observable<Team[]> {
    return this.http.get(this.teamURL)
      .map((serverTeams: v0.Team[]) => teamsFromServerModel(serverTeams))
      .map((teams: Team[]) => teams.sort((a, b) => {
        const c = a.divisionName.localeCompare(b.divisionName);
        if (c === 0) {
          return a.name.localeCompare(b.name);
        } else {
          return c;
        }
      }));
  }

  fetch(teamID: number): Observable<Team> {
    return this.http.get(`${this.teamURL}/${teamID}`)
      .map((serverTeam: v0.Team) => teamFromServerModel(serverTeam));
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
    divisionName: team.divisionName,
    logoURL: team.logoURL,
  };
}
