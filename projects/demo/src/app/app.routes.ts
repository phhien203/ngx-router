import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StaticComponent} from './modules/static/static.component';

export const appRoutes: Routes = [
    {
        path: ':someId',
        component: StaticComponent,
        data: {
            someData: {
                foo: 'bar',
            },
            anotherData: {
                bar: 'foo',
            },
        },
    },
    {
        path: 'lazy',
        loadChildren: () => import(`./modules/lazy/lazy.module`).then(m => m.LazyModule),
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            initialNavigation: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
