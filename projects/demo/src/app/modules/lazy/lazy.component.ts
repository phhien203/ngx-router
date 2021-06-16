import {ChangeDetectionStrategy, Component, Inject, InjectionToken} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {queryParamFactory} from 'ngx-router/query-param';
import {routeParamFactory} from 'ngx-router/route-param';
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
        {
            provide: APP_LAZY_ID,
            useFactory: routeParamFactory('lazyId'),
            deps: [ActivatedRoute],
        },
        {
            provide: APP_LAZY_QUERY,
            useFactory: queryParamFactory('lazyQuery'),
            deps: [ActivatedRoute],
        },
    ],
})
export class LazyComponent {
    constructor(
        @Inject(APP_LAZY_ID) public readonly lazyId$: Observable<string>,
        @Inject(APP_LAZY_QUERY) public readonly lazyQuery$: Observable<string>,
    ) {}
}
