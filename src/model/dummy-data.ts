import {Team} from './Team';
import {Match} from './Match';
import {Rink} from "./Rink";
import {Division} from "./Division";

export namespace db {
  const _divisions: { [key: string]: Division } = {
    'c': {ID: 1, name: 'C'},
    'b': {ID: 2, name: 'B'},
    'a': {ID: 3, name: 'A'},
  };

  const _rinks: { [key: string]: Rink } = {
    'avondale': {ID: 1, name: 'Avondale'},
    'botany': {ID: 1, name: 'Botany'},
  };

  const _teams: { [key: string]: Team } = {
    'bears': {
        name:     'Bears',
      division: _divisions['c'],
        logoURL:  'http://placekitten.com/g/40/40'
    },
    'hawks': {
        name:     'Hawks',
      division: _divisions['c'],
        logoURL:  'http://placekitten.com/g/40/40'
    },
    'lions': {
      name: 'Lions',
      division: _divisions['c'],
      logoURL: 'http://placekitten.com/g/40/40'
    },
    'tigers': {
      name: 'Tigers',
      division: _divisions['c'],
      logoURL: 'http://placekitten.com/g/40/40'
    },
    'scorpions': {
      name: 'Scorpions',
      division: _divisions['c'],
      logoURL: 'http://placekitten.com/g/40/40'
    }
  };

  export const teams: Array<Team> = Object.keys(_teams).map(key => _teams[key]);
  export const rinks: Array<Rink> = Object.keys(_rinks).map(key => _rinks[key]);
  export const divisions: Array<Rink> = Object.keys(_divisions).map(key => _divisions[key]);
  export const matches: Array<Match> = [
    {
      ID: 1,
      date: new Date(),
      rink: _rinks['botany'],
      away: _teams['bears'],
      awayScore: 5,
      home: _teams['hawks'],
      homeScore: 2
    },
    {
      ID: 2,
      date: new Date(),
      rink: _rinks['avondale'],
      away: _teams['hawks'],
      home: _teams['bears']
    },
    {
      ID: 3,
      date: new Date(),
      rink: _rinks['avondale'],
      away: _teams['hawks'],
      home: _teams['tigers']
    },
    {
      ID: 4,
      date: new Date(),
      rink: _rinks['botany'],
      away: _teams['lions'],
      home: _teams['scorpions']
    }
  ];
}
