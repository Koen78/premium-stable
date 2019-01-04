/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { MedCheckXrayMySuffixDetailComponent } from 'app/entities/med-check-xray-my-suffix/med-check-xray-my-suffix-detail.component';
import { MedCheckXrayMySuffix } from 'app/shared/model/med-check-xray-my-suffix.model';

describe('Component Tests', () => {
    describe('MedCheckXrayMySuffix Management Detail Component', () => {
        let comp: MedCheckXrayMySuffixDetailComponent;
        let fixture: ComponentFixture<MedCheckXrayMySuffixDetailComponent>;
        const route = ({ data: of({ medCheckXray: new MedCheckXrayMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [MedCheckXrayMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MedCheckXrayMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MedCheckXrayMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.medCheckXray).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
