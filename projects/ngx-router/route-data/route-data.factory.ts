import {ActivatedRoute, Data} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export function routeDataFactory(
    paramKey: string,
): (route: ActivatedRoute) => Observable<any> {
    return ({data}: Data): Observable<any> => {
        return data.pipe(map((data: Data) => data[paramKey]));
    };
}
