import {ActivatedRoute} from '@angular/router';

export function queryParamSnapshotFactory(
    paramKey: string,
): (route: ActivatedRoute) => string | null {
    return (route: ActivatedRoute) => {
        return route.snapshot.queryParamMap.get(paramKey);
    };
}
