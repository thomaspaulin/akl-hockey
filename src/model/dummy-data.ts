import { Team } from './Team';
import { Match } from './Match';

export namespace db {
  const _teams = {
    'bears': {
        name:     'Bears',
        division: 'C',
        logoURL:  'some-icon.png'
    },
    'hawks': {
        name:     'Hawks',
        division: 'C',
        logoURL:  'some-other-icon.png'
    }
  };

  export const teams: Array<Team> = Object.keys(_teams).map(key => _teams[key]);

  export const matches: Array<Match> = [
    {
      date: new Date(),
      rink: 'Botany',
      away: _teams['bears'],
      awayScore: 5,
      home: _teams['hawks'],
      homeScore: 2
    },
    {
      date: new Date(),
      rink: 'Avondale',
      away: _teams['hawks'],
      home: _teams['bears']
    },
  ];
}
