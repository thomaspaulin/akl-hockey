import { Team } from './Team';

export namespace db {
  export const teams: Array<Team> = [
    {name: 'Bears', logoURL: 'some-icon.png'},
    {name: 'Hawks', logoURL: 'some-other-icon.png'}
  ];
}
