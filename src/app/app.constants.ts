import {Team} from "../model/Team";
import {Division} from "../model/Division";

export const BASE_URL = 'https://snc-api.herokuapp.com/api';
export const V0_URL = `${BASE_URL}/v0`;

export const DEFAULT_AVATAR_URL = 'http://placekitten.com/g/64/64';
export const UNKNOWN_TEAM = <Team>{name: 'Unknown', division: <Division>{name: 'Unknown'}, logoURL: DEFAULT_AVATAR_URL};
