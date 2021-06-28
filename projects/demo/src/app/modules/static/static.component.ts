import {ChangeDetectionStrategy, Component, Inject, InjectionToken} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {routeDataFactory} from 'ngx-router/route-data';
import {routeDataSnapshotFactory} from 'ngx-router/route-data-snapshot';
import {routeParamFactory} from 'ngx-router/route-param';
import {Observable} from 'rxjs';

export const APP_SOME_ID = new InjectionToken<Observable<string>>(
    'stream of someId route param',
);
export const APP_SOME_DATA = new InjectionToken<Observable<any>>('stream of someData');
export const APP_ANOTHER_DATA = new InjectionToken<any>('anotherData');

@Component({
    selector: 'static',
    templateUrl: './static.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: APP_SOME_ID,
            useFactory: routeParamFactory('someId'),
            deps: [ActivatedRoute],
        },
        {
            provide: APP_SOME_DATA,
            useFactory: routeDataFactory('someData'),
            deps: [ActivatedRoute],
        },
        {
            provide: APP_ANOTHER_DATA,
            useFactory: routeDataSnapshotFactory('anotherData'),
            deps: [ActivatedRoute],
        },
    ],
})
export class StaticComponent {
    constructor(
        @Inject(APP_SOME_ID) public readonly someId$: Observable<string>,
        @Inject(APP_SOME_DATA) public readonly someData$: Observable<any>,
        @Inject(APP_ANOTHER_DATA) public readonly anotherData: any,
    ) {}
}
