import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {V0_URL} from "../../app/app.constants";
import {Match} from "../../model/Match";
import {Observable} from "rxjs/Observable";
import {v0} from "../../model/api/v0.models";
import {teamFromServerModel} from "../team/team";
import {rinkFromServerModel} from "../rink/rink";

@Injectable()
export class MatchesProvider {
  private matchesURL = `${V0_URL}/matches`;

  constructor(public http: HttpClient) {
  }

  fetchAll(): Observable<Match[]> {
    return this.http.get(this.matchesURL)
      .map((serverMatches: v0.Match[]) => matchesFromServerModel(serverMatches))
      .map((matches: Match[]) => matches.sort((a, b) => a.date.getTime() - b.date.getTime()));
  }
}

export function matchesFromServerModel(matches: v0.Match[]): Match[] {
  return matches.map(m => matchFromServerModel(m));
}

export function matchFromServerModel(m: v0.Match): Match {
  if (!m) {
    return undefined;
  }
  return <Match>{
    ID: m.ID,
    date: m.start,
    away: teamFromServerModel(m.away),
    home: teamFromServerModel(m.home),
    awayScore: m.awayScore,
    homeScore: m.homeScore,
    rink: rinkFromServerModel(m.rink)
  }
}
