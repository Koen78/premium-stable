/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PremiumStableTestModule } from '../../../test.module';
import { CompetitionMySuffixComponent } from 'app/entities/competition-my-suffix/competition-my-suffix.component';
import { CompetitionMySuffixService } from 'app/entities/competition-my-suffix/competition-my-suffix.service';
import { CompetitionMySuffix } from 'app/shared/model/competition-my-suffix.model';

describe('Component Tests', () => {
    describe('CompetitionMySuffix Management Component', () => {
        let comp: CompetitionMySuffixComponent;
        let fixture: ComponentFixture<CompetitionMySuffixComponent>;
        let service: CompetitionMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [CompetitionMySuffixComponent],
                providers: []
            })
                .overrideTemplate(CompetitionMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompetitionMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompetitionMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CompetitionMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.competitions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
