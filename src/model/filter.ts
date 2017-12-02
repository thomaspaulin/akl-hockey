import {Match} from './Match';
import { Team } from './Team';

export type FilterValue = Team | string;

export namespace filter {
  export function allMatch(obj: any, filters: {[key: string]: FilterValue}): boolean {
    if (!obj) {
      return false;
    } else {
      if (filters) {
        for (const key of Object.keys(filters)) {
          if (!obj.hasOwnProperty(key) || obj[key] !== filters[key]) {
            return false;
          }
        }
      }
      return true;
    }
  }

  export function filterMatch(m: Match, filters: {[key: string]: FilterValue}): boolean {
    if (!m) {
      return false;
    } else {
      if (filters) {
        let passes = true;
        for (const key of Object.keys(filters)) {
          switch (key) {
            case 'activeTeam':
              passes = passes && (filters[key] == 'Show all' || m.home.name.toLowerCase() === (filters[key] as Team).name.toLowerCase()
                || m.away.name.toLowerCase() === (filters[key] as Team).name.toLowerCase());
              break;
            case 'start':
              passes = (passes && m.date.getTime() >= Date.parse(filters[key] as string)) || !filters[key];
              break;
            case 'end':
              let endDate = new Date(Date.parse(filters[key] as string));
              // set the end time to just before midnight so all matches for that date are covered
              endDate.setHours(23, 59, 59, 999);
              passes = (passes && m.date.getTime() <= endDate.getTime()) || !filters[key];
              break;
          }
        }
        return passes;
      }
      return true;
    }
  }
}
