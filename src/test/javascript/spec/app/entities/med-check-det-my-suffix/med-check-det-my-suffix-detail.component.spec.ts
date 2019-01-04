/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { MedCheckDetMySuffixDetailComponent } from 'app/entities/med-check-det-my-suffix/med-check-det-my-suffix-detail.component';
import { MedCheckDetMySuffix } from 'app/shared/model/med-check-det-my-suffix.model';

describe('Component Tests', () => {
    describe('MedCheckDetMySuffix Management Detail Component', () => {
        let comp: MedCheckDetMySuffixDetailComponent;
        let fixture: ComponentFixture<MedCheckDetMySuffixDetailComponent>;
        const route = ({ data: of({ medCheckDet: new MedCheckDetMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [MedCheckDetMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MedCheckDetMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MedCheckDetMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.medCheckDet).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
