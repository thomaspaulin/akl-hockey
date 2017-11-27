import {Team} from "./Team";

export interface Division {
  ID?: number;
  name: string;
  teams: Team[];
}
