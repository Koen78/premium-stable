/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { HorseMySuffixDetailComponent } from 'app/entities/horse-my-suffix/horse-my-suffix-detail.component';
import { HorseMySuffix } from 'app/shared/model/horse-my-suffix.model';

describe('Component Tests', () => {
    describe('HorseMySuffix Management Detail Component', () => {
        let comp: HorseMySuffixDetailComponent;
        let fixture: ComponentFixture<HorseMySuffixDetailComponent>;
        const route = ({ data: of({ horse: new HorseMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [HorseMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HorseMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HorseMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.horse).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
