import {Team} from "../model/Team";
import {Division} from "../model/Division";

export const BASE_URL = 'https://snc-api.herokuapp.com/api';
export const V0_URL = `${BASE_URL}/v0`;

export const DEFAULT_AVATAR_URL = 'http://placekitten.com/g/64/64';
export const UNKNOWN_TEAM = <Team>{name: 'Unknown', divisionName: 'Unknown', logoURL: DEFAULT_AVATAR_URL};
export const UNKNOWN_DIVISION = <Division>{name: 'Unknown', teams: []};

// Storage keys
export const SCHEDULE_FILTER_KEY = 'schedule_filters';

