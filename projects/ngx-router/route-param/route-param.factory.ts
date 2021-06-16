import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export function routeParamFactory(
    paramKey: string,
): (route: ActivatedRoute) => Observable<string | null> {
    return (route: ActivatedRoute): Observable<string | null> => {
        return route.paramMap.pipe(map(param => param.get(paramKey)));
    };
}
