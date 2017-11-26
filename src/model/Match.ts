import {Rink} from "./Rink";
import {Team} from "./Team";

export class Match {
  ID?: number;
  date: Date;
  rink: Rink;
  divisionName: string;
  away: Team;
  home: Team;
  awayScore?: number;
  homeScore?: number;
}
