import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {StaticComponent} from './static.component';

@NgModule({
    imports: [CommonModule],
    declarations: [StaticComponent],
    exports: [StaticComponent],
})
export class StaticModule {}
