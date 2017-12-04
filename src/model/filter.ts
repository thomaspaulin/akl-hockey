import { Match } from './Match';
import { Team } from './Team';

export interface Filters {
  activeTeam: Team;
  start: Date;
  end: Date;
}

export namespace filter {
  export function filterMatch(m: Match, filters: Filters): boolean {
    if (!m) {
      return false;
    } else {
      if (filters) {
        let passes = true;
        if (filters.activeTeam) {
          passes = passes && (filters.activeTeam == null || (m.home.name.toLowerCase() === filters.activeTeam.name.toLowerCase()
            || m.away.name.toLowerCase() === filters.activeTeam.name.toLowerCase()));
        }
        if (filters.start) {
          passes = passes && (m.date.getTime() >= filters.start.getTime());
        }

        if (filters.end) {
          let endDate = filters.end;
              // set the end time to just before midnight so all matches for that date are covered
              endDate.setHours(23, 59, 59, 999);
          passes = (passes && m.date.getTime() <= endDate.getTime());
          }
        return passes;
      }
      return true;
    }
  }
}
