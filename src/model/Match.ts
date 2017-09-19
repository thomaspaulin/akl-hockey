import { Team } from './Team';

export class Match {
  date: Date;
  rink: string;
  away: string;
  home: string;
  awayScore?: number;
  homeScore?: number;
}
