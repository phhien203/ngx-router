import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {asyncScheduler, of, scheduled} from 'rxjs';
import {APP_LAZY_QUERY, LazyComponent} from './lazy.component';
import {APP_LAZY_ID} from './tokens';

describe('LazyComponent', () => {
    let fixture: ComponentFixture<LazyComponent>;

    beforeEach(async () => {
        TestBed.overrideComponent(LazyComponent, {
            set: {
                providers: [
                    {
                        provide: APP_LAZY_QUERY,
                        useValue: 'lalala',
                    },
                    {
                        provide: APP_LAZY_ID,
                        useValue: scheduled(of('123456789'), asyncScheduler),
                    },
                ],
            },
        });

        await TestBed.configureTestingModule({
            declarations: [LazyComponent],
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

    it('should get query param', async(() => {
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('pre'));

        expect(el.nativeElement.textContent).toEqual('lalala');
    }));

    it('should get lazyId route param', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const el = fixture.debugElement.query(By.css('.lazy-id'));

            expect(el.nativeElement.textContent).toContain('123456789');
        });
    }));

    it('should get lazyId route param - using fakeAsync', fakeAsync(() => {
        fixture.detectChanges();
        tick();

        const el = fixture.debugElement.query(By.css('.lazy-id'));

        fixture.detectChanges();
        expect(el.nativeElement.textContent).toContain('123456789');
    }));
});
