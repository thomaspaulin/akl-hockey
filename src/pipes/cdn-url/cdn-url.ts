import {Pipe, PipeTransform} from '@angular/core';
import {CDN_BASE_URL, DEFAULT_AVATAR_URL} from "../../app/app.constants";

/**
 * Generated class for the CdnUrlPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'CDN',
})
export class CdnUrlPipe implements PipeTransform {
  /**
   * Prepends the CDN URL to a string
   */
  transform(value: string, ...args) {
    if (value) {
      if (value.charAt(0) === '/') {
        return `${CDN_BASE_URL}${value}`;
      } else {
        return `${CDN_BASE_URL}/${value}`;
      }
    } else {
      return DEFAULT_AVATAR_URL;
    }
  }
}
