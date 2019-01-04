/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { RaceMySuffixDetailComponent } from 'app/entities/race-my-suffix/race-my-suffix-detail.component';
import { RaceMySuffix } from 'app/shared/model/race-my-suffix.model';

describe('Component Tests', () => {
    describe('RaceMySuffix Management Detail Component', () => {
        let comp: RaceMySuffixDetailComponent;
        let fixture: ComponentFixture<RaceMySuffixDetailComponent>;
        const route = ({ data: of({ race: new RaceMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [RaceMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RaceMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RaceMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.race).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
