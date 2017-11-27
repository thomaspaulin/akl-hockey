import {Match} from './Match';

export class Filter {
  key: string;
  value: any;
}

export namespace filter {
  export function allMatch(obj: any, filters: Array<Filter>): boolean {
    if (!obj) {
      return false;
    } else {
      if (filters && filters.length > 0) {
        for (let filter of filters) {
          if (!obj.hasOwnProperty(filter.key) || obj[filter.key] !== filter.value) {
            return false;
          }
        }
      }
      return true;
    }
  }

  export function filterMatch(m: Match, filters: Array<Filter>): boolean {
    if (!m) {
      return false;
    } else {
      if (filters && filters.length > 0) {
        for (let filter of filters) {
          switch (filter.key) {
            case 'home':
            case 'away':
              return m.home.name.toLowerCase() === filter.value.toLowerCase()
                || m.away.name.toLowerCase() === filter.value.toLowerCase();
          }
        }
      }
      return true;
    }
  }
}
