/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { GenderMySuffixDetailComponent } from 'app/entities/gender-my-suffix/gender-my-suffix-detail.component';
import { GenderMySuffix } from 'app/shared/model/gender-my-suffix.model';

describe('Component Tests', () => {
    describe('GenderMySuffix Management Detail Component', () => {
        let comp: GenderMySuffixDetailComponent;
        let fixture: ComponentFixture<GenderMySuffixDetailComponent>;
        const route = ({ data: of({ gender: new GenderMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [GenderMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GenderMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GenderMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gender).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
