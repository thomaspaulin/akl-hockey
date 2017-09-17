import { Team } from './Team';

export class Match {
  date: Date;
  rink: string;
  away: Team;
  home: Team;
  awayScore?: number;
  homeScore?: number;
}
