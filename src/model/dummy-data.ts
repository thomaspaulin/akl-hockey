import {Team} from './Team';
import {Match} from './Match';
import {Rink} from "./Rink";
import {Division} from "./Division";

export namespace db {
  const _rinks: { [key: string]: Rink } = {
    'avondale': {ID: 1, name: 'Avondale'},
    'botany': {ID: 1, name: 'Botany'},
  };

  const _teams: { [key: string]: Team } = {
    'bears': {
      name: 'Bears',
      divisionName: 'C',
      logoURL: 'http://placekitten.com/g/40/40'
    },
    'hawks': {
      name: 'Hawks',
      divisionName: 'C',
      logoURL: 'http://placekitten.com/g/40/40'
    },
    'lions': {
      name: 'Lions',
      divisionName: 'C',
      logoURL: 'http://placekitten.com/g/40/40'
    },
    'tigers': {
      name: 'Tigers',
      divisionName: 'C',
      logoURL: 'http://placekitten.com/g/40/40'
    },
    'grizzlies': {
      name: 'Grizzlies',
      divisionName: 'B',
      logoURL: 'http://placekitten.com/g/40/40'
    }
  };

  const _divisions: { [key: string]: Division } = {
    'c': {ID: 1, name: 'C', teams: [_teams['bears'], _teams['hawks'], _teams['tigers'], _teams['lions']]},
    'b': {ID: 2, name: 'B', teams: [_teams['grizzlies']]},
    'a': {ID: 3, name: 'A', teams: []},
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
    }
  ];
}
