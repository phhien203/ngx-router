import {FactoryProvider, InjectionToken} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

function queryParamFactory(
    route: ActivatedRoute,
    paramKey: string,
): Observable<string | null> {
    return route.queryParamMap.pipe(map(queryParamMap => queryParamMap.get(paramKey)));
}

export function provideQueryParam(
    token: InjectionToken<Observable<string>>,
    paramKey: string,
): FactoryProvider {
    return {
        provide: token,
        useFactory: queryParamFactory,
        deps: [
            ActivatedRoute,
            new InjectionToken<string>('param key token', {factory: () => paramKey}),
        ],
    };
}
