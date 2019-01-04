/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { ColorMySuffixDetailComponent } from 'app/entities/color-my-suffix/color-my-suffix-detail.component';
import { ColorMySuffix } from 'app/shared/model/color-my-suffix.model';

describe('Component Tests', () => {
    describe('ColorMySuffix Management Detail Component', () => {
        let comp: ColorMySuffixDetailComponent;
        let fixture: ComponentFixture<ColorMySuffixDetailComponent>;
        const route = ({ data: of({ color: new ColorMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [ColorMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ColorMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ColorMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.color).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
