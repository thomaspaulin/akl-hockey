export namespace v0 {
  export interface Division {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    name: string;
    teams: Team[];
  }

  export interface Rink {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    name: string;
  }

  export interface Team {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    name: string;
    divisionName: string;
    logoURL: string;
  }

  export interface Match {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    start: string;  // date string in the format "2017-03-18T05:00:00Z"
    season: number;
    status: string;
    divisionName: string;
    away: Team;
    home: Team;
    awayScore: number;
    homeScore: number;
    rink: Rink;
  }
}
