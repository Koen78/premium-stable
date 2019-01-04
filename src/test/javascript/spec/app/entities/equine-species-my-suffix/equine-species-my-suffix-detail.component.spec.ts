/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { EquineSpeciesMySuffixDetailComponent } from 'app/entities/equine-species-my-suffix/equine-species-my-suffix-detail.component';
import { EquineSpeciesMySuffix } from 'app/shared/model/equine-species-my-suffix.model';

describe('Component Tests', () => {
    describe('EquineSpeciesMySuffix Management Detail Component', () => {
        let comp: EquineSpeciesMySuffixDetailComponent;
        let fixture: ComponentFixture<EquineSpeciesMySuffixDetailComponent>;
        const route = ({ data: of({ equineSpecies: new EquineSpeciesMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [EquineSpeciesMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EquineSpeciesMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EquineSpeciesMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.equineSpecies).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
