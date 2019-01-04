/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { MedCheckMySuffixDetailComponent } from 'app/entities/med-check-my-suffix/med-check-my-suffix-detail.component';
import { MedCheckMySuffix } from 'app/shared/model/med-check-my-suffix.model';

describe('Component Tests', () => {
    describe('MedCheckMySuffix Management Detail Component', () => {
        let comp: MedCheckMySuffixDetailComponent;
        let fixture: ComponentFixture<MedCheckMySuffixDetailComponent>;
        const route = ({ data: of({ medCheck: new MedCheckMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [MedCheckMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MedCheckMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MedCheckMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.medCheck).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
