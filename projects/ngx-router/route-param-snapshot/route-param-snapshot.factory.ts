import {ActivatedRoute} from '@angular/router';

export function routeParamSnapshotFactory(
    paramKey: string,
): (route: ActivatedRoute) => string | null {
    return (route: ActivatedRoute): string | null => {
        return route.snapshot.paramMap.get(paramKey);
    };
}
