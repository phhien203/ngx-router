import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

export const APP_LAZY_ID = new InjectionToken<Observable<string>>(
    'stream of lazyId route param',
);
