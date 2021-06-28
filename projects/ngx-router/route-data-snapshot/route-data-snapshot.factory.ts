import {ActivatedRoute} from '@angular/router';

export function routeDataSnapshotFactory(
    paramKey: string,
): (route: ActivatedRoute) => any {
    return (route: ActivatedRoute): any => {
        return route.snapshot.data[paramKey];
    };
}
