import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LazyComponent} from './lazy.component';

export const routes: Routes = [
    {
        path: ':lazyId',
        component: LazyComponent,
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [LazyComponent],
    exports: [LazyComponent],
})
export class LazyModule {}
