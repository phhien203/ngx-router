import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {provideRouteParam} from '@ngx-router';
import {Observable} from 'rxjs';
import {APP_LAZY_ID} from './tokens';

@Component({
    selector: 'lazy',
    templateUrl: './lazy.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideRouteParam(APP_LAZY_ID, 'lazyId')],
})
export class LazyComponent {
    constructor(@Inject(APP_LAZY_ID) public readonly lazyId$: Observable<string>) {}
}
