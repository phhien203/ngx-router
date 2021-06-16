import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {asapScheduler, asyncScheduler, of, scheduled} from 'rxjs';
import {APP_LAZY_QUERY, LazyComponent} from './lazy.component';
import {APP_LAZY_ID} from './tokens';

describe('LazyComponent', () => {
    let fixture: ComponentFixture<LazyComponent>;

    beforeEach(async () => {
        TestBed.overrideProvider(APP_LAZY_QUERY, {
            useValue: scheduled(of('happy coding'), asyncScheduler),
        });
        TestBed.overrideProvider(APP_LAZY_ID, {
            useValue: scheduled(of('123456789'), asapScheduler),
        });
        await TestBed.configureTestingModule({
            declarations: [LazyComponent],
            providers: [APP_LAZY_QUERY, APP_LAZY_ID],
        }).compileComponents();

        fixture = TestBed.createComponent(LazyComponent);
    });

    it('should be created', () => {
        fixture.detectChanges();
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should get route param', done => {
        fixture.detectChanges();

        fixture.componentInstance.lazyId$.subscribe(val => {
            expect(val).toBe('123456789');
            done();
        });
    });

    it('should get query param', done => {
        fixture.detectChanges();

        fixture.componentInstance.lazyQuery$.subscribe(val => {
            expect(val).toBe('happy coding');
            done();
        });
    });

    xit('should get query param', fakeAsync(() => {
        tick();
        fixture.detectChanges();

        // tslint:disable-next-line:no-console
        console.log(fixture.debugElement.query(By.css('pre')).nativeElement);
        expect(fixture.debugElement.query(By.css('pre')).nativeElement.textContent).toBe(
            'happy coding',
        );
    }));
});
