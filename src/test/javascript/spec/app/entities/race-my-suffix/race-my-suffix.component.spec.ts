/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PremiumStableTestModule } from '../../../test.module';
import { RaceMySuffixComponent } from 'app/entities/race-my-suffix/race-my-suffix.component';
import { RaceMySuffixService } from 'app/entities/race-my-suffix/race-my-suffix.service';
import { RaceMySuffix } from 'app/shared/model/race-my-suffix.model';

describe('Component Tests', () => {
    describe('RaceMySuffix Management Component', () => {
        let comp: RaceMySuffixComponent;
        let fixture: ComponentFixture<RaceMySuffixComponent>;
        let service: RaceMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [RaceMySuffixComponent],
                providers: []
            })
                .overrideTemplate(RaceMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RaceMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RaceMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RaceMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.races[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
