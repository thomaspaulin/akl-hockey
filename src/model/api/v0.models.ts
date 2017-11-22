export namespace v0 {
  export interface Division {
    ID: string;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt: Date;
    name: string;
  }

  export interface Rink {
    ID: string;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt: Date;
    name: string;
  }

  export interface Team {
    ID: string;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt: Date;
    name: string;
    divisionID: number;
    logoURL: string;
  }
}
