import { Team } from './Team';
import { Match } from './Match';

export namespace db {
  const _teams = {
    'bears': {
        name:     'Bears',
        division: 'C',
        logoURL:  'http://placekitten.com/g/40/40'
    },
    'hawks': {
        name:     'Hawks',
        division: 'C',
        logoURL:  'http://placekitten.com/g/40/40'
    },
    'lions': {
      name: 'Lions',
      division: 'C',
      logoURL: 'http://placekitten.com/g/40/40'
    },
    'tigers': {
      name: 'Tigers',
      division: 'C',
      logoURL: 'http://placekitten.com/g/40/40'
    },
    'scorpions': {
      name: 'Scorpions',
      division: 'C',
      logoURL: 'http://placekitten.com/g/40/40'
    }
  };

  export const teams: Array<Team> = Object.keys(_teams).map(key => _teams[key]);

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
    {
      date: new Date(),
      rink: 'Avondale',
      away: 'hawks',
      home: 'tigers'
    },
    {
      date: new Date(),
      rink: 'Botany',
      away: 'lions',
      home: 'scorpions'
    }
  ];
}
