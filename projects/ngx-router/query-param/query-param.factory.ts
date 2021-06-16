import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export function queryParamFactory(
    paramKey: string,
): (route: ActivatedRoute) => Observable<string | null> {
    return (route: ActivatedRoute) => {
        return route.queryParamMap.pipe(map(queryMap => queryMap.get(paramKey)));
    };
}
