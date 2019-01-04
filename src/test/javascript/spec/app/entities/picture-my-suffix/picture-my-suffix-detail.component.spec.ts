/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { PictureMySuffixDetailComponent } from 'app/entities/picture-my-suffix/picture-my-suffix-detail.component';
import { PictureMySuffix } from 'app/shared/model/picture-my-suffix.model';

describe('Component Tests', () => {
    describe('PictureMySuffix Management Detail Component', () => {
        let comp: PictureMySuffixDetailComponent;
        let fixture: ComponentFixture<PictureMySuffixDetailComponent>;
        const route = ({ data: of({ picture: new PictureMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [PictureMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PictureMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PictureMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.picture).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
