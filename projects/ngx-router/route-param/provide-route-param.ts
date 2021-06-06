import {FactoryProvider, InjectionToken} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

function routeParamFactory(
    route: ActivatedRoute,
    paramKey: string,
): Observable<string | null> {
    return route.paramMap.pipe(map(paramMap => paramMap.get(paramKey)));
}

export function provideRouteParam(
    token: InjectionToken<Observable<string>>,
    paramKey: string,
): FactoryProvider {
    return {
        provide: token,
        useFactory: routeParamFactory,
        deps: [
            ActivatedRoute,
            new InjectionToken<string>('param key token', {factory: () => paramKey}),
        ],
    };
}
