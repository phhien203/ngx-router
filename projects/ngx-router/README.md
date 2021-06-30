# ngx-router

[![angular-open-source-starter](https://img.shields.io/badge/made%20with-angular--open--source--starter-d81676?logo=angular)](https://github.com/TinkoffCreditSystems/angular-open-source-starter)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/phhien203/ngx-router/CI%20of%20all%20packages)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/ngx-router)

## What's ngx-router

`ngx-router` is a utility that allows Angular users to get route param, query param, or route data from `ActivatedRoute` by using dependency injection. It's fully tree-shakable. Supported Angular version >= 9.

More information in the [indepth article](https://indepth.dev/posts/1471/leveraging-dependency-injection-to-reduce-duplicated-code-in-angular)

## Usage

1. Install package

```shell
# install ngx-router
npm i ngx-router
```

2. Declare Injection Token to hold route param, query param, or route data

3. Use

    - `routeParamFactory`, `routeParamSnapshotFactory` to get value from route param as an Observable or as a snapshot
    - `queryParamFactory`, `queryParamSanpshotFactory` to get value from query param as an Observable or as a snapshot
    - `routeDataFactory`, `routeDataSnapshotFactory` to get value from route `data` as an Observable or as a snapshot

4. Inject the token in step 2 and use it.

```javascript

// Suppose you have route config as following

export const appRoutes: Routes = [
    {
        path: ':someId',
        component: SomeComponent,
    }
]


import { routeParamFactory } from 'ngx-router/route-param';
import { ActivatedRoute } from '@angular/router';

export const APP_SOME_ID = new InjectionToken<Observable<string>>('stream of :someId route param');

@Component({
    template: `<p>someId value: {{ someId$ | async }} </p>`,
    selecttor: 'app-some-component',
    providers: [
        {
            provide: APP_SOME_ID,
            useFactory: routeParamFactory('someId'),
            deps: [ActivatedRoute]
        }
    ]
})
export class SomeComponent {
    constructor(@Inject(APP_SOME_ID) public readonly someId$: Observable<string>) {}
}

```
