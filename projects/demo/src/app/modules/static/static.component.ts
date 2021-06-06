import {ChangeDetectionStrategy, Component, Inject, InjectionToken} from '@angular/core';
import {provideRouteParam} from '@ngx-router/route-param';
import {Observable} from 'rxjs';

export const APP_SOME_ID = new InjectionToken<Observable<string>>(
    'stream of someId route param',
);

@Component({
    selector: 'static',
    templateUrl: './static.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideRouteParam(APP_SOME_ID, 'someId')],
})
export class StaticComponent {
    constructor(@Inject(APP_SOME_ID) public readonly someId$: Observable<string>) {}
}
