import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { V0_URL } from "../../app/app.constants";
import { v0 } from "../../model/api/v0.models";
import { Match } from "../../model/Match";
import { rinkFromServerModel } from "../rink/rink.provider";
import { teamFromServerModel } from "../team/team.provider";

@Injectable()
export class MatchesProvider {
  private matchesURL = `${V0_URL}/matches`;

  constructor(public http: HttpClient) {
  }

  fetchBetween(start: Date, end: Date): Observable<Match[]> {
    const data = {
      start: formatDate(start),
      end: formatDate(end)
    };
    return this.http.get(this.matchesURL, {params: data})
      .map((serverMatches: v0.Match[]) => matchesFromServerModel(serverMatches))
      .map((matches: Match[]) => matches.sort((a, b) => {
        return a.date.getTime() - b.date.getTime()
      }));
  }
}

export function matchesFromServerModel(matches: v0.Match[]): Match[] {
  if (!matches) {
    return [];
  }
  return matches.map(m => matchFromServerModel(m));
}

export function matchFromServerModel(m: v0.Match): Match {
  if (!m) {
    return undefined;
  }
  return <Match>{
    ID: m.ID,
    date: new Date(m.start),
    divisionName: m.divisionName,
    away: teamFromServerModel(m.away),
    home: teamFromServerModel(m.home),
    awayScore: m.awayScore,
    homeScore: m.homeScore,
    rink: rinkFromServerModel(m.rink)
  }
}

export function formatDate(d: Date): string {
  const year = `${d.getFullYear()}`;
  const month = (d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;
  const day = (d.getDate() + 1) < 10 ? `0${d.getDate() + 1}` : `${d.getDate() + 1}`;
  return `${year}-${month}-${day}`;
}
