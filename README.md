# ngx-router

[![angular-open-source-starter](https://img.shields.io/badge/made%20with-angular--open--source--starter-d81676?logo=angular)](https://github.com/TinkoffCreditSystems/angular-open-source-starter)
![Travis (.org)](https://img.shields.io/travis/TinkoffCreditSystems/angular-open-source-starter)

## What's ngx-router

`ngx-router` is a utility that allows Angular users to get route param or query param from `ActivatedRoute` by using dependency injection.

## Usage

1. Install package

```shell
# install ngx-router
npm i ngx-router
```

2. Declare Injection Token to hold route param or query param

3. Use `provideRouteParam`, `provideRouteParamSnapshot`, `provideQueryParam`, or `provideQueryParamSanpshot` in component providers, then inject the token in step 2 and use it.

```javascript
/*
Suppose you have route config as following

export const appRoutes: Routes = [
    {
        path: ':someId',
        component: SomeComponent,
    }
]
 */

import { provideRouteParam } from 'ngx-router/route-param';

export const APP_SOME_ID = new InjectionToken<Observable<string>>('stream of :someId route param');

@Component({
    selecttor: 'app-some-component',
    providers: [provideRouteParam(APP_SOME_ID, 'someId')]
})
export class SomeComponent {
    constructor(@Inject(APP_SOME_ID) public readonly someId$: Observable<string>) {}
}
```
