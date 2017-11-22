import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Team } from '../model/Team';
import { db } from '../model/dummy-data';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * @deprecated use providers/team/team.ts instead
 */
@Injectable()
export class TeamsService {
  fetchAll(): Observable<Array<Team>> {
    return new BehaviorSubject(db.teams);
  }

  fetch(teamName: string): Observable<Team> {
    const team = db.teams.find((t: Team) => t.name.toLowerCase() === teamName.toLowerCase());
    return new BehaviorSubject(team);
  }
}
