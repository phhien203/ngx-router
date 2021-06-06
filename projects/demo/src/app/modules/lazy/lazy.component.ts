import {ChangeDetectionStrategy, Component, Inject, InjectionToken} from '@angular/core';
import {provideQueryParam} from '@ngx-router/query-param';
import {provideRouteParam} from '@ngx-router/route-param';
import {Observable} from 'rxjs';
import {APP_LAZY_ID} from './tokens';

export const APP_LAZY_QUERY = new InjectionToken<Observable<string>>(
    'stream of lazyQuery',
);

@Component({
    selector: 'lazy',
    templateUrl: './lazy.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        provideRouteParam(APP_LAZY_ID, 'lazyId'),
        provideQueryParam(APP_LAZY_QUERY, 'lazyQuery'),
    ],
})
export class LazyComponent {
    constructor(
        @Inject(APP_LAZY_ID) public readonly lazyId$: Observable<string>,
        @Inject(APP_LAZY_QUERY) public readonly lazyQuery$: Observable<string>,
    ) {}
}
