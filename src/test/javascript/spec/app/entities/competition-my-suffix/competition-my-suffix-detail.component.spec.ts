/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { CompetitionMySuffixDetailComponent } from 'app/entities/competition-my-suffix/competition-my-suffix-detail.component';
import { CompetitionMySuffix } from 'app/shared/model/competition-my-suffix.model';

describe('Component Tests', () => {
    describe('CompetitionMySuffix Management Detail Component', () => {
        let comp: CompetitionMySuffixDetailComponent;
        let fixture: ComponentFixture<CompetitionMySuffixDetailComponent>;
        const route = ({ data: of({ competition: new CompetitionMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [CompetitionMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CompetitionMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompetitionMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.competition).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
