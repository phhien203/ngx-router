import {Component, Inject, InjectionToken} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ActivatedRoute, convertToParamMap, Data, ParamMap, Params} from '@angular/router';
import {queryParamFactory} from 'ngx-router/query-param';
import {routeDataFactory} from 'ngx-router/route-data';
import {routeParamFactory} from 'ngx-router/route-param';
import {BehaviorSubject, Observable} from 'rxjs';

export class ActivatedRouteStub {
    private readonly paramMap$$ = new BehaviorSubject<ParamMap>(convertToParamMap({}));
    private readonly queryParamMap$$ = new BehaviorSubject<ParamMap>(
        convertToParamMap({}),
    );
    private readonly data$$ = new BehaviorSubject<Data>({});

    public readonly paramMap = this.paramMap$$.asObservable();
    public readonly queryParamMap = this.queryParamMap$$.asObservable();
    public readonly data = this.data$$.asObservable();

    public readonly snapshot = {
        paramMap: this.paramMap$$.value,
        queryParamMap: this.queryParamMap$$.value,
        data: this.data$$.value,
    };

    public setParamMap(params: Params = {}): void {
        this.paramMap$$.next(convertToParamMap(params));
    }

    public setQueryParamMap(params: Params = {}): void {
        this.queryParamMap$$.next(convertToParamMap(params));
    }

    public setData(data: Data = {}): void {
        this.data$$.next(data);
    }
}

const APP_SOME_ID$ = new InjectionToken<Observable<string>>('someId');
const APP_SOME_QUERY$ = new InjectionToken<Observable<string>>('someQuery');
const APP_SOME_DATA$ = new InjectionToken<Observable<any>>('someData');

@Component({
    selector: 'my-component',
    template: `
        <p>someId:</p>
        <pre class="some-id">{{ someId$ | async }}</pre>
        <p>someQuery:</p>
        <pre class="some-query">{{ someQuery$ | async }}</pre>
        <p>someData:</p>
        <pre class="some-data">{{ someData$ | async | json }}</pre>
    `,
    providers: [
        {
            provide: APP_SOME_ID$,
            useFactory: routeParamFactory('someId'),
            deps: [ActivatedRoute],
        },
        {
            provide: APP_SOME_QUERY$,
            useFactory: queryParamFactory('someQuery'),
            deps: [ActivatedRoute],
        },
        {
            provide: APP_SOME_DATA$,
            useFactory: routeDataFactory('someData'),
            deps: [ActivatedRoute],
        },
    ],
})
class MyComponent {
    constructor(
        @Inject(APP_SOME_ID$) public someId$: Observable<string>,
        @Inject(APP_SOME_QUERY$) public someQuery$: Observable<string>,
        @Inject(APP_SOME_DATA$) public someData$: Observable<any>,
    ) {}
}

let fixture: ComponentFixture<MyComponent>;

const mockActivatedRoute = new ActivatedRouteStub();

describe('ngx-router tests', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: mockActivatedRoute,
                },
            ],
            declarations: [MyComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(MyComponent);
        fixture.detectChanges();
    });

    it('should get the route param correctly', async(() => {
        mockActivatedRoute.setParamMap({someId: '123456789'});
        fixture.detectChanges();

        const ele = fixture.debugElement.query(By.css('.some-id'));

        expect(ele.nativeElement.textContent).toEqual('123456789');
    }));

    it('should get the query param correctly', async(() => {
        mockActivatedRoute.setQueryParamMap({someQuery: 'you are awesome!'});
        fixture.detectChanges();

        const ele = fixture.debugElement.query(By.css('.some-query'));

        expect(ele.nativeElement.textContent).toEqual('you are awesome!');
    }));

    it('should get the route data correctly', async(() => {
        mockActivatedRoute.setData({someData: {foo: 'bar'}});
        fixture.detectChanges();

        const ele = fixture.debugElement.query(By.css('.some-data'));

        expect(JSON.parse(ele.nativeElement.textContent)).toEqual(
            jasmine.objectContaining({foo: 'bar'}),
        );
    }));
});
