import {NgModule} from '@angular/core';
import {CdnUrlPipe} from './cdn-url/cdn-url';

@NgModule({
  declarations: [CdnUrlPipe],
  imports: [],
  exports: [CdnUrlPipe]
})
export class PipesModule {
}
