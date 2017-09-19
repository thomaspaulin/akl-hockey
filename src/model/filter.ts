export class Filter {
  key: string;
  value: any;
}

export function filterObject(obj: any, filters: Array<Filter>): boolean {
  if(!obj) {
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
