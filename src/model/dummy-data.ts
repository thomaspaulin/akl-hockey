import { Team } from './Team';
import { Match } from './Match';

export namespace db {
  export const teams: Array<Team> = [
    {
      name:     'Bears',
      division: 'C',
      logoURL:  'some-icon.png'
    },
    {
      name:     'Hawks',
      division: 'C',
      logoURL:  'some-other-icon.png'
    }
  ];

  export const matches: Array<Match> = [
    {
      date: new Date(),
      rink: 'Botany',
      away: 'bears',
      awayScore: 5,
      home: 'hawks',
      homeScore: 2
    },
    {
      date: new Date(),
      rink: 'Avondale',
      away: 'hawks',
      home: 'bears'
    },
  ];
}
