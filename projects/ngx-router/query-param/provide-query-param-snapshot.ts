import {FactoryProvider, InjectionToken} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

function queryParamSnapshotFactory(
    route: ActivatedRoute,
    paramKey: string,
): string | null {
    return route.snapshot.queryParamMap.get(paramKey);
}

export function provideQueryParamSnapshot(
    token: InjectionToken<string>,
    paramKey: string,
): FactoryProvider {
    return {
        provide: token,
        useFactory: queryParamSnapshotFactory,
        deps: [
            ActivatedRoute,
            new InjectionToken<string>('param key token', {factory: () => paramKey}),
        ],
    };
}
