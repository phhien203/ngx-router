import {FactoryProvider, InjectionToken} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

function routeParamSnapshotFactory(
    route: ActivatedRoute,
    paramKey: string,
): string | null {
    return route.snapshot.paramMap.get(paramKey);
}

export function provideRouteParamSnapshot(
    token: InjectionToken<string>,
    paramKey: string,
): FactoryProvider {
    return {
        provide: token,
        useFactory: routeParamSnapshotFactory,
        deps: [
            ActivatedRoute,
            new InjectionToken<string>('param key token', {factory: () => paramKey}),
        ],
    };
}
